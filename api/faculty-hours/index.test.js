// Tests for the faculty-hours auth gate. Run: node api/faculty-hours/index.test.js
const assert = require("assert");
const path = require("path");
const fs = require("fs");
const { isJcsuEmail, getRole } = require("./auth.js");
const handler = require("./index.js");

function principalHeader({ email, roles = ["anonymous", "authenticated"] } = {}) {
  const principal = {
    identityProvider: "azureActiveDirectory",
    userId: "00000000-0000-0000-0000-000000000000",
    userDetails: email,
    userRoles: roles
  };
  return Buffer.from(JSON.stringify(principal)).toString("base64");
}

async function callGet(headers) {
  const context = { res: null };
  await handler(context, { method: "GET", headers: headers || {} });
  return context.res;
}

async function run() {
  const results = [];
  const test = async (name, fn) => {
    try {
      await fn();
      results.push({ name, ok: true });
    } catch (error) {
      results.push({ name, ok: false, error: error.message });
    }
  };

  // --- isJcsuEmail ---
  await test("accepts @jcsu.edu", () => {
    assert.strictEqual(isJcsuEmail("dr.smith@jcsu.edu"), true);
  });
  await test("accepts @mymail.jcsu.edu", () => {
    assert.strictEqual(isJcsuEmail("student@mymail.jcsu.edu"), true);
  });
  await test("email check is case-insensitive and trims whitespace", () => {
    assert.strictEqual(isJcsuEmail(" Student@JCSU.EDU "), true);
  });
  await test("rejects other and lookalike domains", () => {
    assert.strictEqual(isJcsuEmail("person@gmail.com"), false);
    assert.strictEqual(isJcsuEmail("x@notjcsu.edu"), false);
    assert.strictEqual(isJcsuEmail("evil@jcsu.edu.attacker.com"), false);
    assert.strictEqual(isJcsuEmail(""), false);
  });

  // --- getRole ---
  await test("no principal header means guest", () => {
    assert.strictEqual(getRole({ headers: {} }).role, "guest");
    assert.strictEqual(getRole({ headers: {} }).authenticated, false);
  });
  await test("malformed principal header is treated as guest", () => {
    const req = { headers: { "x-ms-client-principal": "!!not-base64-json!!" } };
    assert.strictEqual(getRole(req).role, "guest");
  });
  await test("Fetch-style Headers objects are supported", () => {
    const headerValue = principalHeader({ email: "student@jcsu.edu" });
    const req = { headers: { get: (name) => (name === "x-ms-client-principal" ? headerValue : null) } };
    assert.strictEqual(getRole(req).role, "jcsu");
  });
  await test("signed-in JCSU email gets the jcsu role", () => {
    const req = { headers: { "x-ms-client-principal": principalHeader({ email: "a.jcsu26@mymail.jcsu.edu" }) } };
    const role = getRole(req);
    assert.strictEqual(role.role, "jcsu");
    assert.strictEqual(role.email, "a.jcsu26@mymail.jcsu.edu");
  });
  await test("Entra app role admin promotes a JCSU email to admin", () => {
    const req = {
      headers: {
        "x-ms-client-principal": principalHeader({
          email: "admin@jcsu.edu",
          roles: ["anonymous", "authenticated", "admin"]
        })
      }
    };
    assert.strictEqual(getRole(req).role, "admin");
  });
  await test("non-JCSU email stays guest even with the admin role", () => {
    const req = {
      headers: {
        "x-ms-client-principal": principalHeader({
          email: "visitor@gmail.com",
          roles: ["anonymous", "authenticated", "admin"]
        })
      }
    };
    assert.strictEqual(getRole(req).role, "guest");
  });
  await test("admin role names are configurable", () => {
    const req = {
      headers: {
        "x-ms-client-principal": principalHeader({
          email: "admin@jcsu.edu",
          roles: ["authenticated", "jcsu-map-admin"]
        })
      }
    };
    assert.strictEqual(getRole(req, { adminRoles: ["jcsu-map-admin"] }).role, "admin");
    assert.strictEqual(getRole(req, { adminRoles: ["other-role"] }).role, "jcsu");
  });

  // --- API function behavior ---
  await test("API returns 401 + no-store for guests", async () => {
    const res = await callGet({});
    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.headers["Cache-Control"], "no-store");
  });
  await test("API returns 401 for signed-in non-JCSU emails", async () => {
    const res = await callGet({ "x-ms-client-principal": principalHeader({ email: "visitor@gmail.com" }) });
    assert.strictEqual(res.status, 401);
  });
  await test("API returns 200 with office hours for JCSU emails", async () => {
    const res = await callGet({ "x-ms-client-principal": principalHeader({ email: "student@jcsu.edu" }) });
    assert.strictEqual(res.status, 200);
    assert.ok(res.body && typeof res.body === "object");
    assert.ok(Object.keys(res.body).length > 0, "expected building data");
  });
  await test("API rejects non-GET methods with 405", async () => {
    const context = { res: null };
    await handler(context, { method: "DELETE", headers: {} });
    assert.strictEqual(context.res.status, 405);
  });

  // --- staticwebapp.config.json + data consistency ---
  await test("staticwebapp.config.json locks /api/* behind authenticated, catch-all last", () => {
    const configPath = path.join(__dirname, "..", "..", "staticwebapp.config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const apiRoute = config.routes.find((route) => route.route === "/api/*");
    assert.ok(apiRoute, "missing /api/* route");
    assert.deepStrictEqual(apiRoute.allowedRoles, ["authenticated"]);
    const lastRoute = config.routes[config.routes.length - 1];
    assert.strictEqual(lastRoute.route, "/*", "catch-all /* must be last (routes match first-in order)");
    assert.ok(lastRoute.allowedRoles.includes("anonymous"), "map must stay public");
  });
  await test("api data copy matches data/faculty-hours.json while it exists", () => {
    const publicPath = path.join(__dirname, "..", "..", "data", "faculty-hours.json");
    if (!fs.existsSync(publicPath)) return; // public copy is removed at the Azure cutover
    const publicData = JSON.parse(fs.readFileSync(publicPath, "utf8"));
    assert.deepStrictEqual(require("./data.json"), publicData);
  });

  return results;
}

if (require.main === module) {
  run().then((results) => {
    let failed = 0;
    results.forEach((result) => {
      console.log(`${result.ok ? "PASS" : "FAIL"} - ${result.name}${result.ok ? "" : `\n      ${result.error}`}`);
      if (!result.ok) failed += 1;
    });
    console.log(failed === 0 ? `All ${results.length} tests passed.` : `${failed} of ${results.length} tests FAILED.`);
    process.exitCode = failed === 0 ? 0 : 1;
  });
}

module.exports = { run };
