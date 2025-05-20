import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../main'


function MyJobs() {
    const [myJobs, setMyJobs] = useState([])
    const {id} = useParams()
    const navigateTo = useNavigate()
    const {isAuthorized, setIsAuthorized, user} = useContext(Context)

    const getMyJobs = async () => {
        try {
            const {data} = await axios.get("/api//getMyJob")
            console.log("myjobs", data)
            setMyJobs(data.myJobs)
            setIsAuthorized(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyJobs();
    }, [id])

    if(!isAuthorized) {
       navigateTo("/")
    }



  return (
    <>
     <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Job Listing
          </h1>
          <div
            className="tab-className text-center wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                {myJobs.map((job, index) => (
                  <div className="job-item p-4 mb-4" key={index}>
                    {" "}
                    {/* Use job ID as key */}
                    <div className="row g-4" >
                      <div className="col-sm-12 col-md-8 d-flex align-items-center">
                        <img
                          className="flex-shrink-0 img-fluid border rounded"
                          src={job.companyLogo || "/img/com-logo-1.jpg"} // Default logo if none provided
                          alt={job.companyName || "Company Logo"}
                          style={{ width: "80px", height: "80px" }}
                        />
                        <div className="text-start ps-4">
                          <h5 className="mb-3">{job.title || "Job Title"}</h5>
                          <span className="text-truncate me-3">
                            <i className="fa fa-map-marker-alt text-primary me-2"></i>
                            {job.location || "Location"}
                          </span>
                          <span className="text-truncate me-3">
                            <i className="far fa-clock text-primary me-2"></i>
                            {job.employmentType || "Full Time"}
                          </span>
                          <span className="text-truncate me-0">
                            <i className="far fa-money-bill-alt text-primary me-2"></i>
                            {job.salary || "$0 - $0"}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div className="d-flex mb-3">
                          <a className="btn btn-light btn-square me-3" href="#">
                            <i className="far fa-heart text-primary"></i>
                          </a>

                          {user && user.role === "Employer" ? (
                              <Link to={`/updateJob/${job._id}`}>
                                <button className="btn btn-success mx-2">Edit</button>
                              </Link>
                            ) : (
                              // <Link to={`/jobDetails/${item._id}`}></Link>
                              <></>
                            )}


                            {user && user.role === "Employer" ? (
                              <Link to={`/jobDelete/${job._id}`}>
                                <button className="btn btn-danger">Delete</button>
                              </Link>
                            ) : (
                              <Link to={`/jobDetails/${job._id}`}>
                              <button className="btn btn-info">Job Details</button>
                            </Link>
                            )}

                         
                        </div>
                        <small className="text-truncate">
                          <i className="far fa-calendar-alt text-primary me-2"></i>
                          Date : {new Date().toLocaleDateString() || "N/A"}
                        </small>
                      </div>
                    </div>
                  </div>
                 ))} 
                <a className="btn btn-primary py-3 px-5" href="#">
                  Browse More Jobs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MyJobs