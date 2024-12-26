import React from 'react'
import './blogcard.css'
import { FaCalendar } from 'react-icons/fa6'
import { IoMdTime } from "react-icons/io";

const BlogCard = ({item}) => {
  return (
    <div className='blogcard'>
      <div className="blog_img">
        <img src={item.image} alt="" />
      </div>
      <div className="blog_box">
        <h3>{item.head}</h3>
        <div className="blog_date">
          <div className="date">
            <FaCalendar />
            <span>{item.date}</span>
          </div>
          <div className="date">
            <IoMdTime className='iod' />
            <span>{item.time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard