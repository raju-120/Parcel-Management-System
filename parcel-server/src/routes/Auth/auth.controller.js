// auth.controller.js
const User = require("../../model/Auth Model/auth.model.js");
const { APIError } = require("../../Util/APIError.js");
const { APIResponse } = require("../../Util/APIResponse.js");
const { asyncHandler } = require("../../Util/asyncHandler.js");
const bcrypt = require("bcryptjs")


const userSignUp = asyncHandler(async(req,res)=>{
  const {email,username,password} = req.body;

  const existedUserEmail = await User.findOne({
    $or: [{email}],
  });
  if(existedUserEmail){
    return res.status(401).json('Email already existed! Use a new email');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create user
  const user = new User({
    username,
    email,
    password:hashedPassword
  });

  await user.save();


  return res
            .status(201)
            .json(
              new APIResponse(201, user, "User registered successfully.")
            )
})



// get all User
const getAllUser = asyncHandler(async (req, res) => {
  const query = {};
  const result = await User.find(query);
  return res
            .status(200)
            .json(result, "Getting all the user")
});


module.exports = {
  userSignUp,
  getAllUser,
};

