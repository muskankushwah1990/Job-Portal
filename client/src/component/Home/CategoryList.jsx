import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

function CategoryList() {
  const { id } = useParams();
  const [categoryData, setcategoryData] = useState([]);
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  const CategoryList = async () => {
    // setIsAuthorized(true);
    try {
      const { data } = await axios.get(`/api/categoryList/${id}`);
      //   console.log(data);
      setcategoryData(data.categoryList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CategoryList();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }
  // console.log(categoryData)
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
                  {categoryData.map((item) => (
                    <div className="job-item p-4 mb-4" key={item._id}>
                      <div className="row g-4">
                        <div className="col-sm-12 col-md-8 d-flex align-items-center">
                          <img
                            className="flex-shrink-0 img-fluid border rounded"
                            src="/img/com-logo-5.jpg"
                            alt=""
                            style={{ width: "80px", height: "80px" }}
                          />
                          <div className="text-start ps-4">
                            <h5 className="mb-3">{item.title}</h5>
                            <span className="text-truncate me-3">
                              <i className="fa fa-map-marker-alt text-primary me-2"></i>
                              {item.location}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-clock text-primary me-2"></i>
                              {new Date().toLocaleTimeString() || "N/A"}
                            </span>
                            <span className="text-truncate me-0">
                              <i className="far fa-money-bill-alt text-primary me-2"></i>
                              {item.fixedSalary}
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

                            
                          

                            {user && user.role === "Employer" ? (
                              <Link to={`/updateJob/${item._id}`}>
                                <button className="btn btn-success mx-2">Edit</button>
                              </Link>
                            ) : (
                              // <Link to={`/jobDetails/${item._id}`}></Link>
                              <></>
                            )}


                            {user && user.role === "Employer" ? (
                              <Link to={`/jobDelete/${item._id}`}>
                                <button className="btn btn-danger">Delete</button>
                              </Link>
                            ) : (
                              <Link to={`/jobDetails/${item._id}`}>
                              <button className="btn btn-info">Job Details</button>
                            </Link>
                            )}

                          
                          </div>
                          <small className="text-truncate">
                            <i className="far fa-calendar-alt text-primary me-2"></i>
                            {new Date().toLocaleDateString() || "N/A"}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link to={"/"}>
                    <a className="btn btn-primary py-3 px-5">
                      Browse More Categories
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryList;
