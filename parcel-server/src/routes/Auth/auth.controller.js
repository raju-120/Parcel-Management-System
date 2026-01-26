// auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/Auth Model/auth.model.js");
const { APIError } = require("../../Util/APIError.js");
const { APIResponse } = require("../../Util/APIResponse.js");
const { asyncHandler } = require("../../Util/asyncHandler.js");

// --- Signup ---
const userSignUp = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const existedUserEmail = await User.findOne({ email });
  if (existedUserEmail) {
    return res.status(401).json({ message: 'Email already exists! Use a new email' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  user.password = undefined; // remove password from response

  return res.status(201).json(
    new APIResponse(
      201,
      {
        user,
        accessToken,
        refreshToken,
      },
      "User registered successfully."
    )
  );
});

// --- Sign In ---
const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new APIError(400, "Email and Password required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new APIError(401, "Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new APIError(401, "Invalid email or password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  user.password = undefined; // hide password
  user.refreshToken = undefined;

  return res.status(200).json(
    new APIResponse(
      200,
      {
        user,
        accessToken,
        refreshToken,
      },
      "Login successful."
    )
  );
});

const googleAuthCallback= asyncHandler(async(req,res)=>{
  const user = req.user;
  if(!user){
    throw new APIError(401, "Google authentication failed");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const frontendURL = `${process.env.FRONTEND_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;
  
  return res.redirect(frontendURL);
})

// --- Get all users ---
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken"); // don't send sensitive data
  return res.status(200).json(
    new APIResponse(200, { users }, "Getting all users")
  );
});

// Logout

const signOut = asyncHandler(async(req,res)=>{
  const {refreshToken} = req.body;
  
  if(!refreshToken){
    return res.status(400).json({
      success: false,
      message: "Refresh token is required to logout",
    });
  }

  // Find user with this refresh token
  const user = await User.findOne({ refreshToken });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found or already logged out",
    });
  }

  console.log("Refresh TOken: ", user)
  // Remove refresh token from DB
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(
    new APIResponse(200, "LogOut Successful.")
  );
})

module.exports = {
  userSignUp,
  signIn,
  googleAuthCallback,
  getAllUser,
  signOut
};
