import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Job() {
  const [jobList, setJobList] = useState([]);

  const fetchData = async () => {
    const allJob = await axios.get("/api/getAllJob");
    try {
      setJobList(allJob.data.jobs);
      // console.log(allJob.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <!-- Jobs Start --> */}
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
              <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                <li className="nav-item">
                  <a
                    className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                    data-bs-toggle="pill"
                    href="#tab-1"
                  >
                    <h6 className="mt-n1 mb-0">Featured</h6>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex align-items-center text-start mx-3 pb-3"
                    data-bs-toggle="pill"
                    href="#tab-2"
                  >
                    <h6 className="mt-n1 mb-0">Full Time</h6>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                    data-bs-toggle="pill"
                    href="#tab-3"
                  >
                    <h6 className="mt-n1 mb-0">Part Time</h6>
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="tab-1" className="tab-pane fade show p-0 active">
                {jobList.map((job) => (
                  <div className="job-item p-4 mb-4" key={job._id}>
                  
                      <div className="row g-4" >
                        <div className="col-sm-12 col-md-8 d-flex align-items-center">
                          <img
                            className="flex-shrink-0 img-fluid border rounded"
                            src="img/com-logo-5.jpg"
                            alt=""
                            style={{ width: "80px", height: "80px" }}
                          />
                          <div className="text-start ps-4">
                            <h5 className="mb-3">{job.title}</h5>
                            <span className="text-truncate me-3">
                              <i className="fa fa-map-marker-alt text-primary me-2"></i>
                              {job.location}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-clock text-primary me-2"></i>
                              {new Date().toLocaleTimeString() || "N/A"}
                            </span>
                            <span className="text-truncate me-0">
                              <i className="far fa-money-bill-alt text-primary me-2"></i>
                              {job.fixedSalary}
                            </span>



                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                          <div className="d-flex mb-3">
                            <a
                              className="btn btn-light btn-square me-3"
                              href=""
                            >
                              <i className="far fa-heart text-primary"></i>
                            </a>
                           
                           <Link to={`/jobDetails/${job._id}`}> <button className="btn btn-primary">
                              Details
                            </button></Link>
                          </div>
                          <small className="text-truncate">
                            <i className="far fa-calendar-alt text-primary me-2"></i>
                            {new Date().toLocaleDateString() || "N/A"}
                          </small>
                        </div>
                      </div>
                  
                  </div>
                ))}
                 <Link to={"/getAllJob"}>
                 <a className="btn btn-primary py-3 px-5" href="">
                    Browse More Jobs
                  </a></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Jobs End --> */}
    </>
  );
}

export default Job;
