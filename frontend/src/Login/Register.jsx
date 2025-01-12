import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
  
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setInputs((prev)=>({...prev,[e.target.name]: e.target.value}))
  }

  const submit = async (e) => {
    e.preventDefault();

   try {
    const res = await axios.post('http://localhost:8800/api/user/register', inputs);
    navigate('/login')
    console.log(res.data);

   } catch (error) {
    console.log(error)
   }

  }
  
  return (
    <div className='login'>
      <div className="log">
        <h2>Sign Up</h2>
        <div className="log1">
          <label htmlFor="username">Username</label>
          <input type="text" name="username"  onChange={handleChange} />
        </div>
        <div className="log1">
          <label htmlFor="email">Email</label>
          <input type="email" name="email"  onChange={handleChange} />
        </div>
        <div className="log1">
          <label htmlFor="password">Password</label>
          <input type="password" name="password"  onChange={handleChange} />
        </div>
        <div className="log1">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name="confirmPassword"  onChange={handleChange} />
        </div>
        <button onClick={submit}>Sign In</button>
        <div className="dont">
          <p>Already have an account?</p>
          <Link to='/login'><h4>Sign In</h4></Link>
        </div>
      </div>
    </div>
  )
}

export default Register