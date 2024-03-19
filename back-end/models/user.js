const mongoose=require("mongoose")
const jwt= require("jsonwebtoken")
const validator=require("validator")
const bcrypt=require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your Name!"],
      minLength: [3, "Name must contain at least 3 Characters!"],
      maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email!"],
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter your Phone Number!"],
    },
    password: {
      type: String,
      required: [true, "Please provide a Password!"],
      minLength: [8, "Password must contain at least 8 characters!"],
      maxLength: [32, "Password cannot exceed 32 characters!"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Please select a role"],
      enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  userSchema.pre("save",async function(){
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
  })
  userSchema.methods.compairepassword=async function(password){
return await bcrypt.compare(password,this.password)
  }
  userSchema.methods.createjwt= function(){
    const token= jwt.sign({id:this._id,name:this.name},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES
    })
    return token
  }
  module.exports=mongoose.model("User",userSchema)