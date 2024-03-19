const express=require("express")
const {  getmyjobs, getsinglejob, postjob, updatejob, deletejob, getalljobs } = require("../controllers/job");
const authenticated = require("../middleware/auth");
const router=express.Router()

router.get("/getall", getalljobs);
router.post("/post", authenticated, postjob);
router.get("/getmyjobs", authenticated, getmyjobs);
router.patch("/update/:id", authenticated, updatejob);
router.route("/delete/:id").delete( authenticated, deletejob);
router.get("/:id", authenticated, getsinglejob);    
module.exports=router