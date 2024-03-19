import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context";

const Application=()=>{
    const history=useNavigate()
    const {isAuthorized,user}=useContext(Context)
    
const [input,setinput]=useState({
    name:"",
    email:"",
    
    address:"",
    coverLetter:"",

})
const [phone,setPhone]=useState("")
const [resume, setResume] = useState(null);
const handelchange=(e)=>{
setinput((prev=>({
    ...prev,
    [e.target.name]:e.target.value
})))
}
const handleFileChange=(event)=>{
  const resume = event.target.files[0];
  setResume(resume);
}
const {id}=useParams()

const handleApplication=async (e)=>{
e.preventDefault()
const formData = new FormData();
formData.append("name",input.name );
formData.append("email", input.email);
formData.append("phone", phone);
formData.append("address", input.address);
formData.append("coverLetter", input.coverLetter);
formData.append("resume", resume);
formData.append("jobId", id);

    try {
   const {data} =    await axios.post("http://localhost:5000/application/post",formData
,
{
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
})
toast.success(data.message);
      history("/job/getall");
    } catch (error) {
toast.error(error.response.data.message);        
    }
}



    if (!isAuthorized || (user && user.role === "Employer")) {
        history("/");
      }
    
      return (
        <section className="application">
          <div className="container">
            <h3>Application Form</h3>
            <form onSubmit={handleApplication}>
              <input
                type="text"
                placeholder="Your Name"
                value={input.name}
                onChange={handelchange}
                name="name"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={input.email}
                name="email"
                onChange={handelchange}
              />
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your Address"
                value={input.address}
                name="address"
                onChange={handelchange}
              />
              <textarea
                placeholder="CoverLetter..."
                value={input.coverLetter}
                onChange={handelchange}
                name="coverLetter"
              />
              <div>
                <label
                  style={{ textAlign: "start", display: "block", fontSize: "20px" }}
                >
                  Select Resume
                </label>
                <input
                  type="file"
                  accept=".pdf, .jpg, .png"
                  onChange={handleFileChange}
                  style={{ width: "100%" }}
                />
              </div>
              <button type="submit">Send Application</button>
            </form>
          </div>
        </section>
      );
}
export default Application