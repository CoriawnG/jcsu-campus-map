// Auth helper for the faculty-hours API (Phase 1 gate).
//
// Azure Static Web Apps forwards the signed-in user to API functions in the
// x-ms-client-principal header: a base64-encoded JSON object with
// identityProvider, userId, userDetails (email/UPN), and userRoles.
// IMPORTANT: the claims array is NOT part of this header in API functions
// (see Microsoft docs "Accessing user information in Azure Static Web Apps"),
// so identity checks must use userDetails + userRoles, never groups claims.
//
// Roles produced here:
//   "guest" - not signed in, or signed in with a non-JCSU email -> 401
//   "jcsu"  - signed in with a @jcsu.edu / @mymail.jcsu.edu email
//   "admin" - JCSU email AND the Entra app role "admin" in userRoles
//             (Phase 2: assign that app role to the JCSU-Map-Admins group)

const JCSU_EMAIL_SUFFIXES = ["@jcsu.edu", "@mymail.jcsu.edu"];
const DEFAULT_ADMIN_ROLES = ["admin"];

function isJcsuEmail(email) {
  const value = String(email || "").trim().toLowerCase();
  return JCSU_EMAIL_SUFFIXES.some((suffix) => value.endsWith(suffix));
}

// Supports both plain-object headers (Azure Functions) and Fetch-style
// Headers objects (SWA CLI emulation) so local and deployed behavior match.
function readHeader(req, name) {
  const headers = req && req.headers;
  if (!headers) return null;
  if (typeof headers.get === "function") {
    return headers.get(name) || headers.get(name.toLowerCase()) || null;
  }
  return headers[name] || headers[name.toLowerCase()] || null;
}

function decodePrincipal(req) {
  const raw = readHeader(req, "x-ms-client-principal");
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  } catch (error) {
    return null;
  }
}

function getAdminRoles(options) {
  const configured =
    options && options.adminRoles !== undefined && options.adminRoles !== null
      ? options.adminRoles
      : process.env.JCSU_ADMIN_ROLES || DEFAULT_ADMIN_ROLES;
  const list = Array.isArray(configured)
    ? configured
    : String(configured).split(",");
  return list
    .map((role) => String(role).trim().toLowerCase())
    .filter(Boolean);
}

function getRole(req, options = {}) {
  const principal = decodePrincipal(req);
  if (!principal) {
    return { role: "guest", authenticated: false, email: "" };
  }
  const email = String(principal.userDetails || "").trim();
  if (!isJcsuEmail(email)) {
    return { role: "guest", authenticated: true, email };
  }
  const roles = Array.isArray(principal.userRoles)
    ? principal.userRoles.map((role) => String(role).toLowerCase())
    : [];
  const adminRoles = getAdminRoles(options);
  const isAdmin = roles.some((role) => adminRoles.includes(role));
  return { role: isAdmin ? "admin" : "jcsu", authenticated: true, email };
}

module.exports = { JCSU_EMAIL_SUFFIXES, isJcsuEmail, decodePrincipal, getRole };
