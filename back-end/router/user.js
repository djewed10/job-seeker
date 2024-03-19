const express=require("express")
const { register, login, logout, getUser } = require("../controllers/user")
const authenticated = require("../middleware/auth")
const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(authenticated,logout)
router.route("/getuser").get(authenticated, getUser);

module.exports=router