import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModel from "./ResumeModel";
import JobSeekerCard from "./JobSeekerCard"; // import JobSeekerCard
import EmployerCard from "./EmployerCard"; // import EmployerCard

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context)
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();



useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("/api/employer/detail", { withCredentials: true })
          .then((res) => {
            console.log(res.data.applications); // Log response data
            setApplications(res.data.applications);
          });
      } else if (user && user.role === "JobSeeker") {
        axios
          .get("/api/jobseeker/detail", { withCredentials: true })
          .then((res) => {
            console.log(res.data.applications); // Log response data
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
    return null; // Render nothing while redirecting
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`/application/delete/${id}`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete application."
      );
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
      {user && user.role === "JobSeeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModel imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications

const EmployerCard = ({ element, openModal }) => {
  if (!element) {
    return <p>Error: Application data is missing.</p>;
  }

  return (
    <div className="job_seeker_card">
      <div className="detail">
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
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        {element.resume && element.resume.url ? (
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        ) : (
          <p>No Resume Available</p>
        )}
      </div>
    </div>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
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
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};
