import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import {Context} from "../../context"

const JobDetails=()=>{
    const [job,setjob]=useState({})
    const {isAuthorized,user}=useContext(Context) 
    const {id} =useParams()
const history=useNavigate()
useEffect(()=>{
  try {
    axios.get(`http://localhost:5000/job/${id}`,{withCredentials:true})
    .then(res=>setjob(res.data.job)).catch((err)=>{ history("/notfound") })
  } catch (error) {
    
  }
      },[])

if(!isAuthorized) history("/login")

    return(
        
        <section className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title: <span> {job.title}</span>
            </p>
            <p>
              Category: <span>{job.category}</span>
            </p>
            <p>
              Country: <span>{job.country}</span>
            </p>
            <p>
              City: <span>{job.city}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Description: <span>{job.description}</span>
            </p>
            <p>
              Job Posted On: <span>{job.jobPostedOn}</span>
            </p>
            <p>
              Salary:{" "}
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
            {user && user.role === "Employer" ? (
              <></>
            ) : (
              <Link to={`/application/${job._id}`}>Apply Now</Link>
            )}
          </div>
        </div>
      </section>
        
       
    )
}
export default JobDetails