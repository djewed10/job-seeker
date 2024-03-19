const jwt = require("jsonwebtoken")
const UnauthenticatedError = require("../errors/unauthenticated-error")
const userSchema=require("../models/user")
const NotFoundError = require("../errors/not-found")
const BadRequest = require("../errors/badrequest")
const authenticated=async(req,res,next)=>{

const {token}=req.cookies
if(!token) throw new UnauthenticatedError("user not authorized")


    const decoded=jwt.verify(token,process.env.JWT_SECRET)
req.user= await userSchema.findById(decoded.id)
next();

}
module.exports=authenticated