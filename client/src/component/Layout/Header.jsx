import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "../../App.css"
import toast from 'react-hot-toast'
import axios from 'axios'

function Header() {
    const [show, setShow] = useState(false)
    const {isAuthorized,setIsAuthorized, user} = useContext(Context)

    // console.log("Is Authorized:", isAuthorized);


    const navigateTo = useNavigate()

    const handleLogout = async () => {
        try {
          const response = await axios.post(
            "api/logout",
    
          );
          toast.success(response.data.message);
          setIsAuthorized(false);
          navigateTo("/login");
        } catch (error) {
          toast.error(error.response.data.message), setIsAuthorized(true);
        }
      };


  return (
    <>
    
        {/* <!-- Navbar Start --> */}
        <nav className={`navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 ${isAuthorized ? "navbarShow" : "navbarHide"}`}>
            <a href="/home" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                <h1 className="m-0 text-primary">JobEntry</h1>
            </a>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"   aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className={`navbar-nav ms-auto p-4 p-lg-0 ${show ? "show-menu menu" : "menu"}`}>
                    <li className='nav-item'>
                        <Link className='nav-link active' to={"/"} onClick={() => setShow(false)}>
                        Home
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link className='nav-link active' to={"/getAllJob"} onClick={() => setShow(false)}>
                        All Jobs
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link className='nav-link active' to={"/application/me"} onClick={() => setShow(false)}>
                          {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
                        </Link>
                    </li>

                  

                    {user && user.role === "Employer" ? (
                        <>
                         <li className='nav-item'>
                            <Link className='nav-link active' to={"/postJob"} onClick={() => setShow(false)}>
                              POST NEW JOB
                            </Link>
                         </li>

                         <li className='nav-item'>
                            <Link className='nav-link active' to={"/job/me"} onClick={() => setShow(false)}>
                              VIEW YOUR JOBS
                            </Link>
                         </li>

                         <li className='nav-item'>
                            <Link className='nav-link active' to={"/addCategory"} onClick={() => setShow(false)}>
                              CATEGORY
                            </Link>
                         </li>
                        </>
                    ) : (
                        <></>
                    )}
                    


                  
                   <li className="dropdown">
                     <a
                       href="#"
                       className="d-block link-body-emphasis dropdown-toggle"
                       data-bs-toggle="dropdown"
                       aria-expanded="false"
                     >
                       {/* Profile Image */}
                       <img
                         src={ user.image?.url ||
                           
                           "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
                         }
                         alt="Profile"
                         width="50"
                         height="50"
                         className="rounded-circle mt-2"
                         style={{objectFit: "cover"}}
                       />
                     </a>
                     <ul className="dropdown-menu text-small">
                       <li>
                         <a className="dropdown-item" href="/user/profile">
                           Profile
                         </a>
                       </li>
                       <li>
                         <hr className="dropdown-divider" />
                       </li>
                       <li>
                         <button className="dropdown-item" onClick={handleLogout}>
                           Log out
                         </button>
                       </li>
                     </ul>
                   </li>
 
                   <a className="nav-link" href="#" style={{color: "#00B074"}}>
                     {" "}
                     {user.name}{" "}
                   </a>
              
                    
                    
                </div>

                <div className="login-button-container mr-5">
               
               </div>
                <button onClick={handleLogout} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Logout<i className="fa fa-arrow-right ms-3"></i></button>
            </div>
        </nav>
        {/* <!-- Navbar End --> */}

    </>
  )
}

export default Header