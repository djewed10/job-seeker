const express=require("express")
const { employerGetAllApplications, jobSeekerGetAllapplications, jobSeekerDeleteApplication, postapplication } = require("../controllers/application")
const authenticated = require("../middleware/auth")
const router= express.Router()


router.route("/employer/getall").get(authenticated,employerGetAllApplications)
router.route("/post").post(authenticated,postapplication)
router.route("/jobseeker/getall").get(authenticated,jobSeekerGetAllapplications)
router.route("delete/:id").delete(authenticated,jobSeekerDeleteApplication)        

module.exports=router