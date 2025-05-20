import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddCategory() {
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")
    // const {isAuthorized, user} = useContext(Context)

    const navigateTo = useNavigate()

    const categorySubmit = async(event) => {
        event.preventDefault();
        // console.log(name, icon);

        try {
            const {data} = await axios.post('/api/categoryInsert', {
                name: name,
                icon: icon
            })
            console.log(data.category)
            setName("")
            setIcon("")
            navigateTo("/")
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <>
 
        <div className='container'>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 col-lg-6 ">
                    <form onSubmit={categorySubmit}>
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

export default AddCategory