import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../main'

function JobDetail() {
    const {id} = useParams()
    console.log(id)
    const [viewJob, setViewJob] = useState({})
    const {isAuthorized, user} = useContext(Context)

    const jobDetails = async () => {
        try {
            const {data} = await axios.get(`/api/getSingleJob/${id}`)
           
            // console.log(data.job)
            setViewJob(data.job)
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
    jobDetails();
   }, [id])


  return (
    <>

     <div className="container-xxl bg-white p-0">
    

        {/* <!-- Header End --> */}
        <div className="container-xxl py-5 bg-dark page-header mb-5">
            <div className="container my-5 pt-5 pb-4">
                <h1 className="display-3 text-white mb-3 animated slideInDown">Job Detail</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb text-uppercase">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item text-white active" aria-current="page">Job Detail</li>
                    </ol>
                </nav>
            </div>
        </div>
        {/* <!-- Header End --> */}


        {/* <!-- Job Detail Start --> */}
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="row gy-5 gx-4">
                   
        
                    <div className="col-lg-12 ">
                        <div className="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                            <h4 className="mb-4">Job Summery</h4>
                          
                            <p><i className="fa fa-angle-right text-primary me-2"></i><b className='fs-5'>Title :</b> {viewJob.title}</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i><b className='fs-5'>Category : </b> {viewJob.category}</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i><b className='fs-5'>Country : </b> {viewJob.country}</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i> <b className='fs-5'>City : </b> {viewJob.city}</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i> <b className='fs-5'>Location : </b> {viewJob.location}</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i> <b className='fs-5'>Description : </b> {viewJob.description}</p>
                            <p className="m-0"><i className="fa fa-angle-right text-primary me-2"></i><b className='fs-5'>Job PostOn : </b> {viewJob.jobPostedOn}</p>
                          
                           {user && user.role === "JobSeeker" ? (
                              <Link to={`/application/${id}`}><button className='btn btn-primary mt-5'>Apply</button></Link>
                           ): (<></>)}
                        </div>
                        
                       
                    </div>
                    
                </div>
              
            </div>
        </div>
        {/* <!-- Job Detail End --> */}



        {/* <!-- Back to Top --> */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>

    </>
  )
}

export default JobDetail