import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Upload from '../Upload.js'
import './update.css'
import axios from "axios"
import { storeContext } from '../Context/Context.jsx';

const CreateEvent = () => {

  const navigate = useNavigate()
  const {token} = useContext(storeContext)

  const user = JSON.parse(localStorage.getItem('user')) || null

  const userId = user?.data?._id;
  console.log(token, "token")

  
  useEffect(()=>{
    const func = () => {
      if (!token) {
      navigate('/login');
      }
    }
  func();
  },[user, navigate])
  

  const [file, setFile] = useState(null)
  const [files, setFiles] = useState({
   user: "",
   title: "",
   description: "",
   date: "",
   img: "",
   category: "",
   organizedby: "",
   price: "",
   location: "",
  })


 
  const handleChange = (e) => {
    setFiles((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const Submit = async (e) =>{
    e.preventDefault();

    const url = await Upload(file)
    if(!url){
      alert("File upload failed. Please try again.");
    return;
    }
    console.log(user.data._id)


    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "website");
  

    try{
      await axios.post("http://localhost:8800/api/event",{
        ...files,
        img:url,
        //user: userId,
      },{withCredentials: true})
      navigate('/')
      
    }catch(error){
      console.log(error)
    }

  }

  
  return (
    <div className='update'>
      <div className="updated">
        <h1>Create Event</h1>
        <div className="update_div">
          <div className="update_cat">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder='Event Title' name="title"  onChange={handleChange} />
          </div>
          <div className="update_cat">
            <label htmlFor="price">Ticket Price</label>
            <input type="text" placeholder='Ticket Price' name="price"  onChange={handleChange} />
          </div>
        </div>
        <div className="update_div">
          <div className="update_cat">
            <label htmlFor="title">Date</label>
            <input type="text" placeholder='Date' name="date"  onChange={handleChange}/>
          </div>
          <div className="update_cat">
            <label htmlFor="file">Image</label>
            <input type="file" placeholder='Ticket Price' name="" id="file" onChange={(e)=>setFile(e.target.files[0])} />
          </div>
        </div>
        <div className="update_div">
          <div className="update_cat">
            <label htmlFor="organize">Organized By</label>
            <input type="text" placeholder='Organized By' name="organizedby"  onChange={handleChange} />
          </div>
          <div className="update_cat">
            <label htmlFor="location">Location</label>
            <input type="text" placeholder='Location' name="location"  onChange={handleChange} />
          </div>
        </div>
        <div className="update_div">
          <div className="update_cat">
            <label htmlFor="title">Description</label>
            <input type="text" placeholder='Description' name="description"  onChange={handleChange} />
          </div>
          <div className="update_cat">
            <label htmlFor="file">Category</label>
            <input type="text" placeholder='Category' name="category"  onChange={handleChange} />
          </div>
        </div>
        <button onClick={Submit}>Submit</button>
      </div>
    </div>
  )
}

export default CreateEvent