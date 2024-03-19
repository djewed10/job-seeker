import {AppBar, Button, FormLabel, TextField, Toolbar} from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import ComputerIcon from '@mui/icons-material/Computer';
import AbcIcon from '@mui/icons-material/Abc';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {Link, useNavigate} from "react-router-dom" 
import axios from "axios"
import toast from "react-hot-toast"
import { Context } from "../../context";
import PhoneIcon from '@mui/icons-material/Phone';
const Register=()=>{
    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
    const history=useNavigate()
const [input,setinput]=useState({
    email:"",
    password:"",
    role:"",
    name:"",
    phone:"",

})

const handelsubmit=async(e)=>{
    e.preventDefault()
    try {
        const {data}= await axios.post( "http://localhost:5000/user/register",
        {"email":input.email,"password":input.password,"role": input.role,"phone":input.phone,"name":input.name}, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          } )
        toast.success(data.message);
        
        
        setIsAuthorized(true);
    } catch (error) {
        console.log(error.response)
        toast.error(error.response.data.message)
       
    }
} 
    if(isAuthorized){
        history("/")

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
          
            <h3>Create a new account</h3>
          </div>
   <form >
    <label>Register As</label>
   <select name="role" onChange={handleChange} value={input.role}>

    <option value="">select role</option>
    <option value="Employer">employer</option>
    <option value="Job Seeker">job seeker</option>
   </select>
   <PersonIcon sx={{ position:"relative",left:"175px",top:"-40px"}}/>
   <label>Name</label>
             
                <input
                className="name"
                  type="text"
                  name="name"
                  placeholder="Zeeshan"
                  value={input.name}
                  onChange={handleChange}
                />
                <AbcIcon sx={{ position:"relative",left:"198px",top:"-60px"}}/> 
   <label>email adrees</label>
<input type="email" name="email" onChange={handleChange} value={input.email}>
</input>
<EmailIcon sx={{ position:"relative",left:"198px",top:"-40px"}}/>
<label>password</label>
<input type="password" name="password" onChange={handleChange} value={input.password}>
</input>
<LockIcon sx={{ position:"relative",left:"198px",top:"-40px"}}/>
<label>Phone Number</label>
             
                <input
                  type="number"
                  name="phone"
                  placeholder="12345678"
                  value={input.phone}
                  onChange={handleChange}
                />
<PhoneIcon sx={{ position:"relative",left:"198px",top:"-40px"}}/>
<Button type="submit" onClick={handelsubmit}>Register</Button>
<Button type="submit"><Link to={"/login"}> Login</Link></Button>

</form>
   </div></section></>
)

}
export default Register;