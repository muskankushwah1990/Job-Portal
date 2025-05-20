import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function EditCategory() {
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")
    const {id} = useParams()
     const {isAuthorized, user} = useContext(Context)

     const EditCategory = async () => {
        try {
            const data = await axios.get(`/api/categoryEdit/${id}`)
            console.log(data)
            setName(data.editCategory.name)
            setIcon(data.editCategory.icon)
        } catch (error) {
            console.log(error)
           
        }
    }

    useEffect(() => {
        EditCategory();
    })




  return (
    <>
 
        <div className='container'>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 col-lg-6 ">
                    <form >
                        <div className='mt-5'>
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name} className='form-control'  onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mt-3 mb-3'>
                            <label htmlFor="icon">Icon</label>
                            <input type="text" value={icon} className='form-control'  onChange={(e) => setIcon(e.target.value)} />
                        </div>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
  
    </>
  
  )
}

export default EditCategory