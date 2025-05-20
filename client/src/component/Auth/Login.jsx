import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const {isAuthorized, setIsAuthorized} = useContext(Context)

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log(email, password, role)

    try {
      const {data} = await axios.post("api/login", {email, password, role})
      // console.log(data)
      setEmail("")
      setPassword("")
      setRole("")
      setIsAuthorized(true)
      toast.success(data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  if(isAuthorized) {
    return <Navigate to={"/"} />
  }

  return (
    <>
    <div className="container-fluid">
        <div className="container">
          <div className="row">
          <div className="col-md-2 col-lg-4"></div>
            <div className="col-md-8 col-lg-4 loginContainer">
               <div>
                <center>
                <img src="https://logodix.com/logo/1713924.png" className='loginLogo' alt="" />
                </center>
               </div>
                <form onSubmit={handleLogin}>
                    <div className='form-group mb-4'>
                        <label htmlFor=''>Email</label>
                        <input type="email" name="" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group mb-4'>
                        <label htmlFor=''>Password</label>
                        <input type="password" name="" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group mb-4">
                  <label htmlFor="">Job Role</label>
                  <div className="dropdown">
                  <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option >Select Role</option>
                    <option >Employer</option>
                    <option >Job Seeker</option>
                  </select>
                  </div>
                </div>
                    <button type='submit' className='btn btn-primary'>Login</button>
                    <hr />
                    <div className='text-center'>
                   
                    <span className='mx-1'>Don't have an account ? </span>
                    <a href='/register' className=''>Register here</a>
                    </div>
                </form>
            </div>
            <div className="col-md-2 col-lg-4"></div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login