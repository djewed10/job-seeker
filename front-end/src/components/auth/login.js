import {AppBar, Button, FormLabel, TextField, Toolbar} from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import ComputerIcon from '@mui/icons-material/Computer';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {Link, Navigate, useNavigate} from "react-router-dom" 
import axios from "axios"
import toast from "react-hot-toast"
import { Context } from "../../context";
const Login=()=>{
    const history=useNavigate()
const [input,setinput]=useState({
    email:"",
    password:"",
    role:""

})
const {isAuthorized,setIsAuthorized}=useContext(Context)
const handelsubmit=async(e)=>{
    e.preventDefault()
    try {
        const {data}= await axios.post( "http://localhost:5000/user/login",
        {"email":input.email,"password":input.password,"role": input.role} , {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials:true,
          })
        toast.success(data.message);
        
        
        setIsAuthorized(true);
    } catch (error) {
        toast.error(error.response.data.message)
       
    }
}
    if(isAuthorized){
        return <Navigate to={'/'}/>

}
const handleChange=(e)=>{
setinput((prev)=>({ 
    ...prev,
    [e.target.name]:e.target.value
 
})
)
}
return(
    <>
      <section className="authPage">
        <div className="container">  <div className="header">
            
            <h3>Login to your account</h3>
          </div>
   <form>
    <label>Login As</label>
   <select name="role" onChange={handleChange} value={input.role}>

    <option value="">select role</option>
    <option value="Employer">employer</option>
    <option value="Job Seeker">job seeker</option>
   </select>
   <PersonIcon sx={{ position:"relative",left:"175px",top:"-42px"}}/>
   <label>email adrees</label>
<input type="email" name="email" onChange={handleChange} value={input.email}>
</input>
<EmailIcon sx={{ position:"relative",left:"198px",top:"-39px"}}/>
<label>password</label>
<input type="password" name="password" onChange={handleChange} value={input.password}>
</input>
<LockIcon sx={{ position:"relative",left:"198px",top:"-39px"}}/>
<Button  type="submit" onClick={handelsubmit}>Login</Button>
<Button><Link to={"/register"}> Register Now</Link></Button>

</form></div>
   </section></>
)

}
export default Login;