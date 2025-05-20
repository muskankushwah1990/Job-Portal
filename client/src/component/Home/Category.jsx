import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Category() {

    const [getCategory, setGetCategory] = useState([])

    const fetchData = async() => {
        try {
            const response =await axios.get('/api/categoryDisplay')
            setGetCategory(response.data.allCategory)
            // console.log(response.data.allCategory)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
  
  return (
    <>

     <div className="container-xxl bg-white p-0">
      







        {/* {/* <!-- Category Start --> */}
        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h1>
                
                    <div className="row g-4"  >
                    {getCategory.map((category, index) => (
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                        {/* path of app.jsx  */}
                        <Link className="cat-item rounded p-4" to={`/categoryList/${category.name}`} >  
                            <div style={{fontSize: "50px"}}><i className={category.icon}></i></div>
                            <h6 className="mb-3">{category.name}</h6>
                        </Link>
                    </div>
                    ))}
                    </div>
                
            </div>
        </div> 
        {/* <!-- Category End --> */}


        



        {/* <!-- Back to Top --> */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>

    </>
  )
}

export default Category