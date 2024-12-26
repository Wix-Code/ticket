import React from 'react'
import './blocard.css'
import { FaCalendar } from 'react-icons/fa6'
import { IoMdTime } from "react-icons/io";

const BloCard = ({item}) => {
  return (
    <div className='cats'>
      <div className="cat">
        <img src={item.image} alt="" />
      </div>
      <div className="cat1">
        <h1>{item.head}</h1>
        <p>Do you know that putting your event up online for ticket sales can be very easy if you know your way?</p>
        <div className="blo_date">
          <div className="dat">
            <FaCalendar />
            <span>{item.date}</span>
          </div>
          <div className="dat">
            <IoMdTime className='io' />
            <span>{item.time}</span>
          </div>
        </div>
        <button>View Post</button>
      </div>
    </div>
  )
}

export default BloCard