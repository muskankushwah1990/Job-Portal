import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function JobDisplay() {
  const [jobList, setJobList] = useState([]); // Initialize as an empty array

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/getAllJob"); // Ensure the correct API URL
      setJobList(response.data.jobs);
      // console.log(response.data); // Set the jobs
    } catch (error) {
      console.error("Error fetching jobs:", error); // Log the error
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data
  }, []); 


  const handleJobDelete = (id) => {
    try {
      axios
        .get(`/api/deleteJob/${id}`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setJobList((prevJob) =>
            prevJob.filter((job) => job._id !== id)
          );
        });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete application."
      );
    }
  };

  return (
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
                {jobList.map((job) => (
                  <div className="job-item p-4 mb-4" key={job._id}>
                    {" "}
                    {/* Use job ID as key */}
                    <div className="row g-4">
                      <div className="col-sm-12 col-md-8 d-flex align-items-center">
                        <img
                          className="flex-shrink-0 img-fluid border rounded"
                          src={job.companyLogo || "img/com-logo-1.jpg"} // Default logo if none provided
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

                          <Link to={`/jobDetails/${job._id}`}>
                            <button className="btn btn-info">
                              Job Details
                            </button>
                          </Link>
                          <Link to={`/jobUpdate/${job._id}`}>
                            <button className="btn btn-success mx-2">
                              Edit Job
                            </button>
                          </Link>
                         
                            <button onClick={() => handleJobDelete(job._id)} className="btn btn-danger">
                             Delete Job
                            </button>
                        
                        </div>
                        <small className="text-truncate">
                          <i className="far fa-calendar-alt text-primary me-2"></i>
                          Date : {new Date().toLocaleDateString() || "N/A"}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDisplay;
