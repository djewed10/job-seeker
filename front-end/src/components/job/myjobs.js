import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";




const Myjobs=()=>{
    const [myJobs,setMyJobs]=useState([])
    const [editingMode,setediting]=useState(null)
    const { isAuthorized, user } = useContext(Context);
    const history=useNavigate()
    const handleInputChange=(jobId,field,value)=>{
      setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );  
    }
    const handleDisableEdit=()=>{
setediting(null)
    }
    const handleDeleteJob=async(jobID)=>{
        
           await axios.delete(`http://localhost:5000/job/delete/${jobID}`,{withCredentials:true}).then((res)=>{ console.log(res)
toast.success(res.data.message)
setMyJobs((jobs)=>{ jobs.filter((job)=>job._id!==jobID) })})
        . catch ((error) =>{
            toast.error(error.response.data.message)
        })

    }
    
    const handleUpdateJob=async (jobID)=>{
        const updated= myJobs.find((job)=>job._id===jobID)
        
            await axios.patch(`http://localhost:5000/job/update/${jobID}`,updated,{withCredentials:true}).then((res) => {
                toast.success(res.data.message);
                setediting(null);
              }).catch((error)=>{ toast.error(error.response.data.message)})
        
    }
    const handleEnableEdit=(id)=>{
        setediting(id)
    }
useEffect(()=>{
  const fetch=  async ()=>{
try {
    await axios.get("http://localhost:5000/job/getmyjobs",{withCredentials:true}) 
    .then(res=>{setMyJobs(res.data.job)}) 
    
} catch (error) {
    toast.error(error.response.data.message);
        setMyJobs([]);
}
} 
fetch() } ,[])
if (!isAuthorized || (user && user.role !== "Employer")) {
    history("/");
  }
    return (
        <>
          <div className="myJobs page">
            <div className="container">
              <h1>Your Posted Jobs</h1>
              {myJobs && myJobs.length > 0 ? (
                <>
                  <div className="banner">
                    {myJobs.map((element) => (
                      <div className="card" key={element._id}>
                        <div className="content">
                          <div className="short_fields">
                            <div>
                              <span>Title:</span>
                              <input
                                type="text"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.title}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "title",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              {" "}
                              <span>Country:</span>
                              <input
                                type="text"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.country}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "country",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              <span>City:</span>
                              <input
                                type="text"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.city}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "city",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              <span>Category:</span>
                              <select
                                value={element.category}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "category",
                                    e.target.value
                                  )
                                }
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                              >
                                <option value="Graphics & Design">
                                  Graphics & Design
                                </option>
                                <option value="Mobile App Development">
                                  Mobile App Development
                                </option>
                                <option value="Frontend Web Development">
                                  Frontend Web Development
                                </option>
                                <option value="MERN Stack Development">
                                  MERN STACK Development
                                </option>
                                <option value="Account & Finance">
                                  Account & Finance
                                </option>
                                <option value="Artificial Intelligence">
                                  Artificial Intelligence
                                </option>
                                <option value="Video Animation">
                                  Video Animation
                                </option>
                                <option value="MEAN Stack Development">
                                  MEAN STACK Development
                                </option>
                                <option value="MEVN Stack Development">
                                  MEVN STACK Development
                                </option>
                                <option value="Data Entry Operator">
                                  Data Entry Operator
                                </option>
                              </select>
                            </div>
                            <div>
                              <span>
                                Salary:{" "}
                                {element.fixedSalary ? (
                                  <input
                                    type="number"
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                    value={element.fixedSalary}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "fixedSalary",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <div>
                                    <input
                                      type="number"
                                      disabled={
                                        editingMode !== element._id ? true : false
                                      }
                                      value={element.salaryFrom}
                                      onChange={(e) =>
                                        handleInputChange(
                                          element._id,
                                          "salaryFrom",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      type="number"
                                      disabled={
                                        editingMode !== element._id ? true : false
                                      }
                                      value={element.salaryTo}
                                      onChange={(e) =>
                                        handleInputChange(
                                          element._id,
                                          "salaryTo",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </span>
                            </div>
                            <div>
                              {" "}
                              <span>Expired:</span>
                              <select
                                value={element.expired}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "expired",
                                    e.target.value
                                  )
                                }
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                              >
                                <option value={true}>TRUE</option>
                                <option value={false}>FALSE</option>
                              </select>
                            </div>
                          </div>
                          <div className="long_field">
                            <div>
                              <span>Description:</span>{" "}
                              <textarea
                                rows={5}
                                value={element.description}
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div>
                              <span>Location: </span>
                              <textarea
                                value={element.location}
                                rows={5}
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "location",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* Out Of Content Class */}
                        <div className="button_wrapper">
                          <div className="edit_btn_wrapper">
                            {editingMode === element._id ? (
                              <>
                                <button
                                  onClick={() => handleUpdateJob(element._id)}
                                  className="check_btn"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => handleDisableEdit()}
                                  className="cross_btn"
                                >
                                  <RxCross2 />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEnableEdit(element._id)}
                                className="edit_btn"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteJob(element._id)}
                            className="delete_btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>
                  You've not posted any job or may be you deleted all of your jobs!
                </p>
              )}
            </div>
          </div>
        </>
      );
              }    
              export default Myjobs