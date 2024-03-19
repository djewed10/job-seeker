import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery} from "@mui/material"
import WorkIcon from '@mui/icons-material/Work';
import { useContext, useState } from "react";
import {Context} from "../../context"
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar=()=>{
    const [value,setvalue]=useState()
const history=useNavigate()
const [show,setshow]=useState(false)
const {isAuthorized,setIsAuthorized,user}=useContext(Context)
const handleLogout=async ()=>{
const res=await axios.get("http://localhost:5000/user/logout",{withCredentials:true}) 
toast.success(res.data.message)
setIsAuthorized(false)
history("/login")

}

const isSmallerThan900px = useMediaQuery("(max-width:900px)");


    return(
        <>
        <AppBar style={!isAuthorized ?{display:"none"}:{display:"flex"}} className={isAuthorized ? "navbarShow" : "navbarHide"} sx={{ backgroundColor: "#232F3D" , position:"sticky",  }}>
            <Toolbar sx={{ "@media (max-width: 900px)": {
      flexDirection: "column", // Adjust flexDirection for smaller screens
    },}} >
                <Typography>
<WorkIcon/>
                </Typography>
<Box  sx={!show? {display:"none"}:{display:"flex"}}
      >    <div className= {!show? "menu":"show-menu"} 
       >
          
           < Tab LinkComponent={NavLink} to="/" label="Home"/>
                        <Tab LinkComponent={NavLink} to="/job/getall" label=" All jobs"/>
                    <Tab LinkComponent={NavLink} to="/applications/me" 
label={user&&user.role==="Employer"? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
                    />
                    {user && user.role==="Employer"?( 
                        
                        <Tab LinkComponent={NavLink} to="/job/post" label="post job"  />
                       
                     ):(
                        <></>
                    )}

                     
                    {user && user.role==="Employer"?( 
                        <Tab LinkComponent={NavLink} to="/job/me" label=" view your jobs"  />
                     ):(
                        <></>
                    )}
                
                 </div></Box>
                <Button onClick={handleLogout}>LOGOUT</Button>
               
                <div className="hamburger">
          <GiHamburgerMenu onClick={() => setshow(!show)} />
        </div>
            </Toolbar>
        </AppBar>
        
        </>
    )
}
export default Navbar