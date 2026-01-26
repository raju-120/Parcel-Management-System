const express = require("express");
const authController = require("./auth.controller.js");
const { loginLimiter } = require("../../Middleware/LoginLimiter.js");
const { refreshAccessToken } = require("./refreshToken.controller.js");
const passport = require("../../Util/passport.config.js")


const authRouter = express.Router();

// authRouter.get('/auth',authController);
authRouter.get('/auth/all-user',authController.getAllUser);
authRouter.post('/auth/signup',authController.userSignUp);
authRouter.post('/auth/sign-in', loginLimiter,authController.signIn);
authRouter.post('/auth/sign-out',authController.signOut);

// Google OAuth routes
authRouter.get("/google", 
      passport.authenticate("google",{
        scope:["profile", "email"]
      }
    )
  );

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
    session: false,
  }),
  authController.googleAuthCallback
);  

authRouter.post("/auth/refresh-token", refreshAccessToken);


module.exports= authRouter;