import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [image, setImage] = useState(null)
  

  const {isAuthorized, setIsAuthorized, user, setUser} = useContext(Context)

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, confirmpassword, phone)
    // console.log("role", role)

    const formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("confirmpassword", confirmpassword)
    formData.append("phone", phone)
    formData.append("role", role)
    formData.append("image", e.target.image.files[0])

    try {
      const {data} = await axios.post("api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      toast.success(data.message)
      // console.log(data)
      setName("")
      setEmail("")
      setPassword("")
      setConfirmpassword("")
      setPhone("")
      setRole("")
      setImage(null)
      setIsAuthorized(true)
      

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  if(isAuthorized) {
    return <Navigate to={'/'} />
  }



  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-lg-4"></div>
            <div className="col-md-8 col-lg-4 registerContainer">
              <div>
                <center>
                  <img
                    src="https://cdn2.sportngin.com/attachments/photo/40d3-121410675/register-button_large.png"
                    className="registerLogo"
                    alt=""
                  />
                </center>
              </div>
              <form onSubmit={handleRegister} className="form">
                <div className="form-group mb-4">
                  <label htmlFor="">Name</label>
                  <input type="text" name="" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Email</label>
                  <input type="email" name="" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Password</label>
                  <input type="password" name="" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Confirm Password</label>
                  <input type="password" name="" className="form-control" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="">Phone no.</label>
                  <input type="number" name="" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
            
                <div className="mb-4">
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    required
                  />
                </div>
            
              

                <button type="submit" className="btn btn-primary" >Register</button>
              </form>
            </div>
            <div className="col-md-2 col-lg-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
