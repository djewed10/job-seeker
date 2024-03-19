const BadRequest = require("../errors/badrequest");
const cloudinary=require("cloudinary");
const NotFoundError = require("../errors/not-found");
const applicationSchema = require("../models/application");
const jobSchema=require("../models/job")
const postapplication=async(req,res)=>{
    const { role } = req.user;
    
    if (role === "Employer") {
        throw new BadRequest("Employer not allowed to access this resource.")
      
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("...")
        throw new BadRequest("Resume File Required!")
      }
      const { resume } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(resume.mimetype)) {
          throw new BadRequest("Invalid file type. Please upload a PNG file.")
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
      );
    
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        throw new BadRequest("Failed to upload Resume to Cloudinary")
      }
      const { name, email, coverLetter, phone, address, jobId } = req.body;
      const applicantID={
        user:req.user._id,
role:"Job Seeker",
      }
      if (!jobId) {
        throw new NotFoundError("Job not found!")
      }
      const jobDetails = await jobSchema.findById(jobId);
      if (!jobDetails) {
        throw new NotFoundError("Job not found!")
      }
    
      const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
      };
      if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
      ) {
throw new BadRequest("Please fill all fields.")
      }
      const application = await applicationSchema.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      });
      res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
      });
    
    
}
const employerGetAllApplications=async(req,res)=>{
  console.log(req.user)
    const { role } = req.user;
    if (role === "job seeker") {
        throw new BadRequest("Employer not allowed to access this resource.")
      
    }  
    const {_id}=req.user
    const apps=await applicationSchema.find({"employerID.user":_id})
    res.status(200).json({
        success: true,
        apps,
      });
} 
const jobSeekerGetAllapplications=async(req,res)=>{
    const { role } = req.user;
    if (role === "employer") {
        throw new BadRequest("Employer not allowed to access this resource.")
      
    }  
    const {_id}=req.user
    const apps=await applicationSchema.find({"applicantID.user":_id})
    res.status(200).json({
        success: true,
        apps,
      });
} 
const jobSeekerDeleteApplication=async(req,res)=>{
    const { role } = req.user;
    if (role === "employer") {
        throw new BadRequest("Employer not allowed to access this resource.")
      
    }  
    const {id}=req.params
    const apps=await applicationSchema.findByIdAndDelete(id)
    if(!apps) throw new NotFoundError("application not found")
    res.status(200).json({
        success: true,
        message:"application deleted"
      });
}  
module.exports={
    postapplication,
    employerGetAllApplications,
    jobSeekerGetAllapplications,
    jobSeekerDeleteApplication
}

