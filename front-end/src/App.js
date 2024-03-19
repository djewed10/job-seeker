import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/layout/navBar";
import Footer from "./components/layout/footer";
import Home from "./components/home/home";
import Jobs from "./components/job/jobs";
import JobDetails from "./components/job/jobDetails";
import Application from "./components/application/application";
import MyApplications from "./components/application/myapps";
import PostJob from "./components/job/postjob";
import NotFound from "./components/not-found/notfound";
import MyJobs from "./components/job/myjobs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data} = await axios.get(
          "http://localhost:5000/user/getuser",
          {
            withCredentials: true,
          }
        );
      

        setUser(data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;