import { useContext, useState } from "react"

import { Context } from "../../context";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

const Postjob=()=>{
    const { isAuthorized, user } = useContext(Context);
    const history=useNavigate()
const [input,setinput]=useState({
    title:"",
    description:"",
    category:"",
    city:"",
    country:"",
    location:"",
    salaryFrom:"",
    salaryTo:"",
    fixedSalary:"",
    salaryType:"default"   ,
    
})
const handlechange=(e)=>{
setinput((prev)=>({ 
      ...prev,
    [e.target.name]:e.target.value}))
}
const handleJobPost=async(e)=>{
  e.preventDefault()
  if(input.salaryType==="Fixed Salary") {input.salaryTo=""
input.salaryFrom=""
}
else if(input.salaryType==="Ranged Salary")  input.fixedSalary=""
else { input.salaryTo=""
input.salaryFrom=""
input.fixedSalary=""
 }
await axios.post("http://localhost:5000/job/post",
  input.fixedSalary.length >= 4
  ? {
      "title":input.title,   
      "description":input.description, 
      "category":input.category,
      "country":input.country,
      "city":input.city,
      "location":input.location,
      "fixedSalary":input.fixedSalary,
    }
  : {
"title":input.title,   
      "description":input.description, 
      "category":input.category,
      "country":input.country,
      "city":input.city,
      "location":input.location,
      "salaryFrom":input.salaryFrom,
      "salaryTo":input.salaryTo,
    }
,{
  withCredentials:true
}).then((res)=>{
toast.success(res.data.message)
 history("/job/getall")
}).catch((err)=>{
  toast.error(err.response.data.message);
})
}
if (!isAuthorized || (user && user.role !== "Employer")) {
  history("/");
}
return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={input.title}
                onChange={handlechange}
                placeholder="Job Title"
                name="title"
              />
              <select
                value={input.category}
                onChange={handlechange}
                name="category"
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={input.country}
                onChange={handlechange}
                placeholder="Country"
                name="country"
              />
              <input
                type="text"
                value={input.city}
                onChange={handlechange}
                placeholder="City"
                name="city"
              />
            </div>
            <input
              type="text"
              value={input.location}
              onChange={handlechange}
              placeholder="Location"
              name="location"
            />
            <div className="salary_wrapper">
              <select
                value={input.salaryType}
                onChange={handlechange}
                name="salaryType"
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {input.salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : input.salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={input.fixedSalary}
                    onChange={handlechange}
                    name="fixedSalary"
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={input.salaryFrom}
                      onChange={handlechange}
                      name="salaryFrom"
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={input.salaryTo}
                      onChange={handlechange}
                      name="salaryTo"
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={input.description}
              onChange={handlechange}
              placeholder="Job Description"
              name="description"
            />
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Postjob