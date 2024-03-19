require("dotenv").config();
require("express-async-errors");
const express=require("express")
const app=express()

const jobrouter=require("./router/job")
const applicationrouter=require("./router/application")
const userrouter=require("./router/user")
const notFound = require("./middleware/not-found")
const connect = require("./db/connect")
const cloudinary =require("cloudinary")
const authenticatedUser=require("./middleware/auth")
const errorHandler = require("./middleware/error-handler")
const cookieparser=require("cookie-parser")
const fileUpload=require("express-fileupload")
//security
//const helmet=require("helmet")
const cors = require('cors');
//const xss = require('xss-clean');
//const rateLimiter = require("express-rate-limit");


app.use(express.json())

//app.use(helmet());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      method: ["GET", "POST", "DELETE", "PATCH"],
      credentials: true,
    })
  );
  
//app.use(xss());
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/user",userrouter)
app.use("/job",jobrouter)
app.use("/application",applicationrouter)
app.use(notFound)
app.use(errorHandler)


          
cloudinary.v2.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});
let port =5000
 const start=async ()=>{
    try {
        await connect(process.env.MONGO_URI)
        app.listen(port,()=>
        console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
   
 }
start()