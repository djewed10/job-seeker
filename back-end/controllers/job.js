
const { StatusCodes } = require("http-status-codes")
const jobSchema=require("../models/job")
const BadRequest = require("../errors/badrequest")
const NotFoundError = require("../errors/not-found")

const getalljobs=async(req,res)=>{
    const job=await jobSchema.find({expired:false}) ;
res.status(StatusCodes.OK).json({job})

}
const postjob=async(req,res)=>{
    const {role}=req.user
    if(role==="job seeker") throw new BadRequest("job seeker is not allow to post jobs")
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,}=req.body
    if (!title || !description || !category || !country || !city || !location) {
    throw new BadRequest ("please fill full form")}
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
   throw new BadRequest("Please either provide fixed salary or ranged salary.")
      }
      const postedBy = req.user._id;
      const job = await jobSchema.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
      });
      res.status(200).json({
        success: true,
        message: "Job Posted Successfully!",
        job,
      });
}
const getmyjobs =async (req,res)=>{
    const { role } = req.user;
    if (role === "Job Seeker") {
       throw new BadRequest("Job Seeker not allowed to access this resource.") 
    }
    const job=await jobSchema.find({postedBy:req.user._id})
    res.status(StatusCodes.OK).json({job})
}
const updatejob =async (req,res)=>{
const {id}=req.params
const { role } = req.user;
if (role === "Job Seeker") {
   throw new BadRequest("Job Seeker not allowed to access this resource.") 
}
const job = await jobSchema.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if(!job) throw new NotFoundError("OOPS! Job not found.")
res.status(StatusCodes.OK).json({message:"job updated"})

}
const deletejob =async (req,res)=>{
    const {id}=req.params
    const { role } = req.user;
    if (role === "Job Seeker") {
       throw new BadRequest("Job Seeker not allowed to access this resource.") 
    }
const job=await jobSchema.findByIdAndDelete({_id:id})
if(!job) throw new NotFoundError("OOPS! Job not found.")
res.status(StatusCodes.OK).json({message:"job deleted"})
}
const getsinglejob =async (req,res)=>{
    const { id } = req.params;
    
      const job = await jobSchema.findById(id);
      if (!job) {
        throw new NotFoundError("Job not found.");
      }
      res.status(200).json({
        success: true,
        job,
      });
}
module.exports={
getalljobs,
getmyjobs,
getsinglejob,
updatejob,
deletejob,postjob
}