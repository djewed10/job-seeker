const { StatusCodes } = require("http-status-codes")
const BadRequest = require("../errors/badrequest")
const userSchema=require("../models/user")
const NotFoundError = require("../errors/not-found")


const register=async (req,res)=>{
const {email ,password,role,name,phone}=req.body
if(!email || !password ||!role ||!name ||!phone){
   throw new BadRequest("please fill full form")
}
const isemail=await userSchema.findOne({email})
if(isemail) throw new BadRequest("email already registred")

const user= await userSchema.create(req.body)
const token=user.createjwt()
const options = {
  expires: new Date(
    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  httpOnly: true, // Set httpOnly to true
};
res.status(StatusCodes.CREATED).cookie("token",token,options).json({success:true,user,token,message:"user registred"})
}
const login=async(req,res)=>{
    const {email ,password,role}=req.body
    if(!email || !password ||!role) 
    throw new BadRequest("Please provide email ,password and role.") 
const user = await userSchema.findOne({email}).select("+password")
if (!user) {
    throw new BadRequest("Invalid Email Or Password.");
  }
  const ispass=await user.compairepassword(password)
  if (!ispass) {
    throw new BadRequest("Invalid Email Or Password.");
  }
  if(user.role!==role) throw new NotFoundError(`User with provided email and ${role} not found!`)
  const token=user.createjwt()
const options = {
  expires: new Date(
    Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  httpOnly: true, // Set httpOnly to true
};
console.log(user)
res.status(StatusCodes.OK).cookie("token",token,options).json({success:true,user,token,message:"user logged in "})


}
const logout=async(req,res)=>{
    res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
}
const getUser = async (req, res) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  };
  module.exports={
    register,
    login,
    logout,
    getUser
  }