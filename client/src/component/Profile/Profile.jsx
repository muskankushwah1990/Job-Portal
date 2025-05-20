import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

function Profile() {
    const {isAuthorized,setIsAuthorized, user} = useContext(Context)

    // update model state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [singleUser, setSingleUser] = useState([])

    // change password state
    const [op, setOp] = useState("")
    const [np, setNp] = useState("")
    const [cp, setCp] = useState("")


    const {id} = useParams()
    const navigateTo = useNavigate()


    const fetchUser = async () => { // setIsAuthorized(true);
        try {
          const {data} = await axios.get(
            "/api/getUser"
          )
        //   console.log("data", data)
          setName(data.name)
          setEmail(data.email)
          setImage(data.image.url)
          setSingleUser(data);
          setIsAuthorized(true);
        } catch (error) {
          setIsAuthorized(false);
        }
      };
      useEffect(() => {
        
        fetchUser();
      }, [isAuthorized]);
   



    // update image
    const handleFileChange = (event) => {
      const image = event.target.files[0]
      setImage(image)
      // console.log("file", image)
    }


    // update profile
    const handleUpdate = async (e) => {
      e.preventDefault()
    // console.log(name, email, image)

    try {
      const formData = new FormData();
      formData.append("name", name)
      formData.append("email", email)
      if(image) {
        formData.append("image", image)
      }
      const {data} = await axios.post(`/api/profile/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      //  console.log("profile", data)
      setName("")
      setEmail("")
      setImage("")
      setIsAuthorized(true)
      toast.success(data.message)
      navigateTo("/user/profile")
    } catch (error) {
      console.log(error)
    }
    }



    // change password
    const handleChangePassword = async(evt) => {
      evt.preventDefault()
      try {
        const {data} = await axios.post(`/api/profile/password/${id}`, {op, np, cp})
        //  console.log(data)
        setOp("")
        setNp("")
        setCp("")
        toast.success(data.message)
        setIsAuthorized(true)
        navigateTo("/user/profile")

      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }

    if(!isAuthorized){
        navigateTo("/login")
    }


  return (
    <>
     
     

      <div className="container">
        <div className="row">
        <h2 className="text-dark text-center mt-5">Your Profile</h2>
          <div className="col-md-2 col-lg-2"></div>
          <div className="col-md-8 col-lg-8">
          
          
            <div className="card my-5 profileCard p-4" style={{ width: "30rem" }}>

           <center>
          
           <img src={ user.image?.url} alt="Profile" className="card-img-top my-4 profileImg rounded-circle"  style={{width: "50%", objectFit: "cover", height:"220px"}} />
           </center>
        
              <div className="card-body ">
               <strong className="fs-4">Name : {user.name}</strong> <br></br>
               <strong className="fs-4">EMAIL :</strong> <span>{user.email}</span>
               
                <div className="d-flex f-wrap">
                <a href="#" className="btn btn-success  my-3 mx-2 profileEditBtn" data-bs-toggle="modal" data-bs-target="#profile">
                 Update Profile
                </a>
                <a href="#" className="btn btn-info  my-3 profileEditBtn" data-bs-toggle="modal" data-bs-target="#password" >
                  Change Password
                </a>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>





{/* <!--update profile Modal --> */}
<div className="modal fade" id="profile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className=" fs-5" id="exampleModalLabel bg-success" style={{padding: "10px 30px", backgroundColor: "green", borderRadius: "0 40%", color: "white"}}>Update Profile</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" style={{textAlign: "left", fontStyle: "normal"}}>
        <form onSubmit={handleUpdate}>
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" >Email</label>
                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="img">Image</label>
                <input type="file" id="img" className="form-control"  onChange={handleFileChange} required /> 
                <img src={image} alt="" style={{height: "6rem"}} />
            </div>
            <div>
            <button className="btn btn-success">Update</button>
            </div>
        </form>
      </div>
   
    </div>
  </div>
</div>


{/* change password model */}

<div className="modal fade" id="password" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className=" fs-5" id="exampleModalLabel bg-success" style={{padding: "10px 30px", backgroundColor: "green", borderRadius: "0 40%", color: "white"}}>Change Password</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" style={{textAlign: "left", fontStyle: "normal"}}>
        <form onSubmit={handleChangePassword}>
            <div className="mb-3">
                <label htmlFor="op">Old Password</label>
                <input type="text" id="op" className="form-control" value={op} onChange={(evt) => setOp(evt.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="np">New Password</label>
                <input type="password" id="np" className="form-control" value={np} onChange={(evt) => setNp(evt.target.value)}  required />
            </div>
            <div className="mb-3">
                <label htmlFor="cp">Confirm Password</label>
                <input type="password" id="cp" className="form-control" value={cp} onChange={(evt) => setCp(evt.target.value)}  required />
            </div>
            <button className="btn btn-success">Update</button>
        </form>
      </div>
   
    </div>
  </div>
</div>

















    </>
  );
}

export default Profile;
