import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../../context";




const Jobs=()=>{
    const [jobs,setjobs]=useState([])
    const { isAuthorized } = useContext(Context);
    
    const history=useNavigate()
    useEffect(()=>{
      const fetch=async ()=>{
        try {
        const {data}=   await axios.get("http://localhost:5000/job/getall",{withCredentials:true})
setjobs(data.job)}

    
         catch (error) {
                console.log(error)
        }} 
        fetch() },[])

if(!isAuthorized)  history("/login")
    return (
        <section className="jobs page">
          <div className="container">
            <h1>ALL AVAILABLE JOBS</h1>
            <div className="banner">
              {jobs &&
                jobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <p>{element.title}</p>
                      <p>{element.category}</p>
                      <p>{element.country}</p>
                      <Link to={`/job/${element._id}`}>Job Details</Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      );
}
export default Jobs