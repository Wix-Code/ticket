import React, { useContext } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../Context/Context'

const Login = () => {

  const {submit, handleChange, loading} = useContext(storeContext)

  return (
    <div className='login'>
      <div className="log">
        <h2>Sign In</h2>
        <div className="log1">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} required/>
        </div>
        <div className="log1">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} required/>
        </div>
        <button disabled={loading} onClick={submit}>{loading ? "Signing In..." : "Sign In"}</button>
        <div className="dont">
          <p>Don't have an account?</p>
          <Link to='/signup'><h4>Sign Up</h4></Link>
        </div>
      </div>
    </div>
  )
}

export default Login