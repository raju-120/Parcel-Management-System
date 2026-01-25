const jwt = require("jsonwebtoken");
const { APIError } = require("../Util/APIError");

exports.verifyJWT = (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new APIError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch {
    throw new APIError(401, "Invalid or expired token");
  }
};
