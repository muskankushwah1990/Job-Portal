import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import toast from "react-hot-toast";

function ApplicantApplication() { 

  const [allApplications, setAllApplications] = useState([]);


  const fetchApplications = async () => {
    try {
      const { data } = await axios.get("/api/employer/getAllApplication");
      console.log("data", data);
      setAllApplications(data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);






  return (
    <>
     <div className="app-container">
        <header className="app-header">
          <h1 className="mt-4">Welcome to My Application</h1>
        </header>

        {allApplications.map((application) => (
          <div className="container mt-4" key={application._id} id="allContent" >
            <div className="row">
              {/* Left-side content card */}
              <div className="col-md-5 col-lg-5 px-5 content-card ">
                <h2 className="mb-2">Name: {application.name}</h2>
                <hr />
                <p><strong>Applicant ID:</strong> {application.applicantID.user}</p>
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Phone:</strong> {application.phone}</p>
                <p><strong>Address:</strong> {application.address}</p>
                <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
               
              </div>

              {/* Right-side image card */}
              <div className="col-md-5 col-lg-5 image-card">
                <img
                  src={application.resume.url}
                  alt="Resume"
                  className="resume-img"
                />
              </div>
            </div>
            
           
          </div>
        ))}
        <p>No data available</p>

      
      </div>
    </>
  );
}

export default ApplicantApplication;
