const { handleError } = require("../utils/errorHandler");
const { verifyToken } = require("./providers/jwt");
const config = require("config");

const KEY = config.get("JWT_KEY");

const auth = (req, res, next) => {
  try {
    const tokenFromClient = req.header("x-auth-token");
    if (!tokenFromClient) throw new Error("Authentication error: please login");

    const userPayload = verifyToken(tokenFromClient, KEY);
    if (!userPayload) throw new Error("Authentication Error: Unauthorize user");
    req.user = userPayload;
    return next();
  } catch (error) {
    return handleError(res, 403, error.message);
  }
};

module.exports = auth;
