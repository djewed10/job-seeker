const { StatusCodes } = require("http-status-codes")
const Custom = require("../errors/custom-error")


const errorhandler= (err,req,res,next)=>{
    //if (err instanceof Custom){  return res.status(err.statusCode).json({message:err.message}) }
    let Custumerror={
        message:err.message || "something went wrong try again later",
        status:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err.name==="castError"){
Custumerror.message=`Resource not found. Invalid ${err.path}`
Custumerror.status=404
    }
    if(err.code==="11000"){
      Custumerror.message=`Duplicate ${Object.keys(err.keyValue)} Entered`
      Custumerror.status=400
    }
    if (err.name === "JsonWebTokenError") {
        Custumerror.message = `Json Web Token is invalid, Try again!`;
        Custumerror.status=400
      }
      if (err.name === "TokenExpiredError") {
        Custumerror.message = `Json Web Token is expired, Try again!`;
        Custumerror.status = 400
      }
 res.status(Custumerror.status).json({message:Custumerror.message})}

module.exports=errorhandler