const express = require("express");
const authModule = require("../../model/Auth Model/auth.model.js");
const authController = require("./auth.controller.js");

const authRouter = express.Router();

authRouter.get('/auth',authController);

module.exports= authRouter;