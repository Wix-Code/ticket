import React from 'react'
import { FaCalendar } from 'react-icons/fa6'
import { IoMdTime } from "react-icons/io";
import './card.css'
import { Link } from 'react-router-dom';

const Card = ({item}) => {
  return (
    <div className='card'>
      <div className="card_img">
        <Link to={`/${item._id}`}>
          <img  src={item.image} alt="" />
        </Link>
        <p className={item.type === "Free" ? "free" : "paid"}>{item.type}</p>
      </div>
      <div className="card_box">
        <h3>{item.title}</h3>
        <div className="card_price">
          <p>#{item.price}</p>
          <h3>{item.cat}</h3>
        </div>
        <div className="card_date">
          <div className="date">
            <FaCalendar />
            <span>{item.startdate}</span>
          </div>
          <div className="date">
            <IoMdTime className='iod' />
            <span>{item.starttime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card