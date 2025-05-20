import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './component/Home/Home'
import Header from './component/Layout/Header'
import Footer from './component/Layout/Footer'
import About from './component/About'
import Contact from './component/Contact'
import Category from './component/Category'
import JobDetail from './component/Job/JobDetail'
import JobList from './component/JobList'
import Testimonial from './component/Testimonial'
import Login from './component/Auth/Login'
import Register from './component/Auth/Register'
import PostJob from './component/Job/PostJob'
import {Toaster} from 'react-hot-toast'
import { Context } from './main'
import axios from 'axios'
import { useContext } from 'react'
import AddCategory from './component/Home/AddCategory'
import Application from './component/Application/Application'
import ApplicantApplication from './component/Employer/ApplicantApplication'
import NotFound from './component/NotFound/NotFound'
import CategoryList from './component/Home/CategoryList'
import EditJob from './component/Job/EditJob'
import JobDisplay from './component/Job/JobDisplay'
import MyApplication from './component/Application/MyApplication'
import MyJobs from './component/Job/MyJobs'
import Profile from './component/Profile/Profile'


function App() {

  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context)
  
  const fetchUser = async () => { // setIsAuthorized(true);
    try {
      const {data} = await axios.get(
        "/api/getUser"
      )
      // console.log(data)
      setUser(data);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };
  useEffect(() => {
    
    fetchUser();
  }, [isAuthorized]);

  return (
   <>
 
     <BrowserRouter>
     <Header />
     <Routes>
   <Route path='/login' element={<Login />} />
   <Route path='/register' element={<Register />} />
    <Route path='/header' element={<Header />} />
    <Route path='/' element={<Home />} />
    <Route path='/user/profile' element={<Profile />} />
    
    <Route path='/footer' element={<Footer />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/category' element={<Category />} />
    <Route path='/jobList' element={<JobList />} />
    <Route path='/testimonial' element={<Testimonial />} />
    <Route path='/postJob' element={<PostJob />} />

    {/* job route */}
    <Route path='/getAllJob' element={<JobDisplay />} />
    <Route path='/jobDetails/:id' element={<JobDetail />} />
    <Route path='/jobUpdate/:id' element={<EditJob />} />
    <Route path='/job/me' element={<MyJobs />} />



    
    {/* category route */}
    <Route path='/addCategory' element={<AddCategory />} />
    <Route path='/categoryList/:id' element={<CategoryList />} />
    <Route path='/updateJob/:id' element={<EditJob />} />

    {/* application route */}

    <Route path="/application/:id" element={<Application />} />
    <Route path='/application/me' element={<MyApplication />} />
    <Route path='/applicant/application' element={<ApplicantApplication />} />

    <Route path='*' element={<NotFound />} />














   </Routes>
   
   <Footer />
     </BrowserRouter>
     
   <Toaster />
     
   
   </>
  )
}

export default App
