const express = require("express");
const authController = require("./auth.controller.js");
const { loginLimiter } = require("../../Middleware/LoginLimiter.js");
const { refreshAccessToken } = require("./refreshToken.controller.js");

const authRouter = express.Router();

// authRouter.get('/auth',authController);
authRouter.get('/auth/all-user',authController.getAllUser);
authRouter.post('/auth/signup',authController.userSignUp);
authRouter.post('/auth/sign-in', loginLimiter,authController.signIn);
authRouter.post('/auth/sign-out',authController.signOut);

authRouter.post("/auth/refresh-token", refreshAccessToken);
module.exports= authRouter;