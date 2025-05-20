import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

function EditJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, SetIsAuthorized } = useContext(Context);

  const navigate = useNavigate();

  //get category
  const [getCategory, setGetCategory] = useState([]);

  const { id } = useParams();

  const GetAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/categoryDisplay");
      // console.log(data)
      setGetCategory(data.allCategory);
    } catch (error) {
      console.log(error);
    }
  };

  //get single job
  const viewJob = async () => {
    try {
      const { data } = await axios.get(`/api/getSingleJob/${id}`);
      // console.log(data);
      setTitle(data.job.title);
      setDescription(data.job.description);
      setCategory(data.job.category);
      setCountry(data.job.country);
      setCity(data.job.city);
      setLocation(data.job.location);
      setSalaryFrom(data.job.salaryFrom);
      setSalaryTo(data.job.salaryTo);
      setFixedSalary(data.job.fixedSalary);
      setSalaryType(data.job.salaryType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewJob();
    GetAllCategory();
  }, []);

  //post job

  // const { isAuthorized, user } = useContext(Context);

  const handleJobUpdate = async (e) => {
    e.preventDefault();
    // console.log(title, category, description, country, city, location, salaryFrom, salaryTo, fixedSalary)

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        `/api/updateJob/${id}`,
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
              fixedSalary,
              salaryType,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTitle("");
        setDescription("");
        setCategory("");
        setCountry("");
        setCity("");
        setLocation("");
        setSalaryFrom("");
        setSalaryTo("");
        setFixedSalary("");
        setSalaryType("");
        toast.success(res.data.message);

        SetIsAuthorized(true);

        navigate("/getAllJob");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  if (!isAuthorized) {
    navigate("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container ">
          <h3 className="my-5 text-center">EDIT JOB</h3>
          <div className="row">
            <div className="col-md-2 mt-5 "></div>
            <div className="col-md-8">
              <form onSubmit={handleJobUpdate}>
                <div className="wrapper">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Job Title"
                    className="form-control mt-3"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control mt-3"
                  >
                    <option value="">Select Category</option>
                    {/* {getCategory.map((category) => (
                      <option  key={category._id}>
                        {category.name}
                      </option>
                    ))} */}

                    {getCategory &&
                      getCategory.map((category, index) => (
                        <option key={index}>{category.name}</option>
                      ))}
                  </select>
                </div>
                <div className="wrapper mt-3">
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="form-control mt-3"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control mt-3"
                    placeholder="City"
                  />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-control mt-3"
                  placeholder="Location"
                />
                <div className="salary_wrapper mt-3">
                  <select
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                    className="form-control"
                  >
                    <option value="default">Select Salary Type</option>
                    <option value="Fixed Salary">Fixed Salary</option>
                    <option value="Ranged Salary">Ranged Salary</option>
                  </select>
                  <div>
                    {salaryType === "default" ? (
                      <p>Please provide Salary Type *</p>
                    ) : salaryType === "Fixed Salary" ? (
                      <input
                        type="number"
                        placeholder="Enter Fixed Salary"
                        value={fixedSalary}
                        onChange={(e) => setFixedSalary(e.target.value)}
                        className="form-control mt-3"
                      />
                    ) : (
                      <div className="ranged_salary">
                        <div className="row">
                          <div className="col-md-6 mt-3">
                            <input
                              type="number"
                              placeholder="Salary From"
                              value={salaryFrom}
                              onChange={(e) => setSalaryFrom(e.target.value)}
                              className="form-control"
                            />
                          </div>

                          <div className="col-md-6 mt-3">
                            <input
                              type="number"
                              placeholder="Salary To"
                              value={salaryTo}
                              onChange={(e) => setSalaryTo(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <textarea
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control mt-3"
                  placeholder="Job Description"
                />
                <button className="btn btn-warning mt-3" type="submit">
                  Update Job
                </button>
              </form>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditJob;
