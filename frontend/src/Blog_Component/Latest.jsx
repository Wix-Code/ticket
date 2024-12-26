import React from 'react'
import './latest.css'
import { Blo } from '../Data'
import BlogCard from './BlogCard'

const Latest = () => {
  return (
    <div className='latest'>
      <h1>Latest Posts</h1>
      <hr />
      <div className="latest_card">
        {
          Blo.map((item)=>{
            return(
              <BlogCard item={item} key={item.id} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Latest