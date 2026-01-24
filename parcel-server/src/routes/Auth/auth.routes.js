const express = require("express");
const authController = require("./auth.controller.js");

const authRouter = express.Router();

// authRouter.get('/auth',authController);
authRouter.get('/auth/all-user',authController.getAllUser);
authRouter.post('/auth/signup',authController.userSignUp);

module.exports= authRouter;