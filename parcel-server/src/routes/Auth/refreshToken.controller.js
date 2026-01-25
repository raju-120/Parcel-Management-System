const jwt = require("jsonwebtoken");
const User = require("../../model/Auth Model/auth.model.js");
const { APIError } = require("../../Util/APIError.js");
const { asyncHandler } = require("../../Util/asyncHandler");

const refreshAccessToken = asyncHandler(async(req,res)=>{
  const {refreshToken} = req.body;

  if (!refreshToken) {
    throw new APIError(401, "Refresh token missing");
  };

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decoded._id);

  if (!user || user.refreshToken !== refreshToken) {
    throw new APIError(403, "Invalid refresh token");
  };

  const newAccessToken = user.generateAccessToken();

  res.status(200).json({
    accessToken: newAccessToken,
  });
});

module.exports = { refreshAccessToken };