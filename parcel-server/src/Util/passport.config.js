const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/Auth Model/auth.model.js");


// Debug: Check if environment variables are loaded
// console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing");
// console.log("Callback URL:", process.env.GOOGLE_CALLBACK_URL);

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error("Missing Google OAuth credentials in environment variables");
// }

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async(accessToken, refreshToken,profile,done)=>{
      try {
        let user = await User.findOne({email:  profile.emails[0].value});
        if (user) {
          // User exists, update googleId if not set
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }else{
          // Create new user
          const randomPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: hashedPassword,
            avatar: profile.photos[0]?.value || undefined,
            googleId: profile.id,
          });

          await user.save();
          return done(null, user);
        }


      } catch (error) {
         return done(error, null);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;