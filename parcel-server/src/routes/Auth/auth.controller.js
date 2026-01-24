// auth.controller.js
const users = require("../../model/Auth Model/auth.model.js");
const { asyncHandler } = require("../../Util/asyncHandler.js");

const getAuthUser = asyncHandler(async (req, res) => {
  // since this is NOT async DB, no await
  const result = users;

  res.status(200).json({
    success: true,
    data: result,
    message: "All the user data",
  });
});

module.exports = getAuthUser;
