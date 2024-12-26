import React from 'react';
import './navbar.css'
import { Paths } from '../Data';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";


const Navbar = () => {

  const location = useLocation();
  const{pathname} = location;

  const user = false;

  return (
    <div className='navbar'>
      <div className='navba'>
        <div className='nav_h1'>
          <h1>ticket.ng</h1>
        </div>
        <div className='nav_path'>
          {
            Paths.slice(0, 5).map((item)=>{
              return(
                <Link to={item.path}>
                  <li key={item.title} className={pathname === item.path ? 'active' : ""}>{item.title}</li>
                </Link>
              )
            })
          }
        </div>
        <div className='nav_right'>
          <Link to='/create'>
            <div className="create">
              <FaCalendarDays />
              <p>Create Event</p>
            </div>
          </Link>
          <button><FaMoon /></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar