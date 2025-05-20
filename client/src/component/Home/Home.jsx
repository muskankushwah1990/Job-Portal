import React, { useContext } from 'react'
import Carousel from './Carousel'
import Category from './Category'
import About from './About'
import Job from './Job'
import Testimonial from './Testimonial'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'

function Home() {
    const {isAuthorized} = useContext(Context)
    if(!isAuthorized) {
        return <Navigate to={"/login"} />
    }
  return (
    <>
    <Carousel />
    <Category />
    <About />
    <Job />
    <Testimonial />
    </>
  )
}

export default Home