import React from 'react'

function Testimonial() {
  return (
    <>
      <div className="container-xxl bg-white p-0">
        {/* <!-- Testimonial Start --> */}
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <h1 className="text-center mb-5">Our Clients Say!!!</h1>
                <div className="owl-carousel testimonial-carousel">
                    <div className="testimonial-item bg-light rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-1.jpg" style={{width: "50px", height: "50px"}} />
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item bg-light rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-2.jpg" style={{width: "50px", height: "50px"}} />
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item bg-light rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-3.jpg" style={{width: "50px", height: "50px"}} />
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-item bg-light rounded p-4">
                        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                        <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                        <div className="d-flex align-items-center">
                            <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-4.jpg"  style={{width: "50px", height: "50px"}} />
                            <div className="ps-3">
                                <h5 className="mb-1">Client Name</h5>
                                <small>Profession</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Testimonial End --> */}
    </div>
    </>
  )
}

export default Testimonial