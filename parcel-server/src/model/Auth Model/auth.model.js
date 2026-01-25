const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg",
    },
    refreshToken: { type: String, default: null } // <- added
  },
  { timestamps: true }
);

userSchema.methods.isPasswordCorrect = async function(plainPassword){
  return await bcrypt.compare(plainPassword, this.password);
};

// JWT Access Token
userSchema.methods.generateAccessToken= function(){
  return jwt.sign(
    {_id: this._id, email: this.email},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    }
  )
}

// JWT Refresh Token
userSchema.methods.generateRefreshToken= function(){
  return jwt.sign(
    {_id: this._id},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    }
  )
}

module.exports = mongoose.model("User", userSchema);
