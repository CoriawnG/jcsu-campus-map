const { getRole } = require("./auth.js");
const facultyData = require("./data.json");

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

// GET /api/faculty-hours - office hours for signed-in JCSU accounts only.
// Platform-level auth comes from staticwebapp.config.json (/api/* requires
// "authenticated"); this function re-checks so the gate also holds if the
// route config is ever loosened, and applies the JCSU email + admin rules.
module.exports = async function (context, req) {
  const method = String(req.method || "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    context.res = {
      status: 405,
      headers: Object.assign({ Allow: "GET, HEAD" }, JSON_HEADERS),
      body: { error: "Method not allowed" }
    };
    return;
  }

  const { role } = getRole(req);
  if (role !== "jcsu" && role !== "admin") {
    context.res = {
      status: 401,
      headers: JSON_HEADERS,
      body: { error: "Sign in with your JCSU email to view faculty office hours." }
    };
    return;
  }

  context.res = {
    status: 200,
    headers: JSON_HEADERS,
    body: facultyData
  };
};
