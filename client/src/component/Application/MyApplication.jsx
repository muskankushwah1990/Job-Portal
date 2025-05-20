import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("/api/employer/detail", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("/api/jobseeker/detail", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
    axios
        .get(`/api/application/delete/${id}`, {
          withCredentials: true,
        })

    

        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1 className="text-center my-5">My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="text-center my-5">Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card" id="allContent">
       <div className="container">
        <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="col-md-1"></div>
          <div className="col-md-4 jobCardContent">
          <div className="content-card">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter122:</span> {element.coverLetter}
          </p>
        </div>
        
          </div>
          <div className="col-md-4">
          <div className="image-card">
          <img
            src={element.resume.url}
            alt="resume"
             className="resume-img "
            onClick={() => openModal(element.resume.url)}
          />
        </div>
          </div>
        </div>
       </div>
        <div className="btn_area">
        <center>
        <button onClick={() => deleteApplication(element._id)} className="btn btn-lg btn-primary">
            Delete Application
          </button>
        </center>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card" id="allContent">
        <div className="container">
          <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="col-md-1"></div>
            <div className="col-md-4 jobCardContent">
              <div className="content-card">
                <h3> {element.name}</h3>

                <p>
                  <span>Email:</span> {element.email}
                </p>
                <p>
                  <span>Phone:</span> {element.phone}
                </p>
                <p>
                  <span>Address:</span> {element.address}
                </p>
                <p>
                  <span>CoverLetter:</span> {element.coverLetter}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="image-card ">
                <img
                  src={element.resume.url}
                  alt="resume"
                  className="resume-img "
                  onClick={() => openModal(element.resume.url)}
                />
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
};
