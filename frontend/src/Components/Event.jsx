import React, { useState } from 'react'
import './event.css'
import { Data } from '../Data'
import Card from './Card'


const Event = () => {

  const [click, setClick] = useState('All')
  return (
    <div className="events">
      <div className='event'>
        <h1>Explore Events</h1>
        <div className="event_btn">
          <button onClick={()=>setClick('All')} className={click === 'All' ? 'active' : ''}>All</button>
          <button onClick={()=>setClick('Social')} className={click === 'Social' ? 'active' : ''}>Social</button>
          <button onClick={()=>setClick('Music')} className={click === 'Music' ? 'active' : ''}>Music</button>
          <button onClick={()=>setClick('Sports')} className={click === 'Sports' ? 'active' : ''}>Sports</button>
          <button onClick={()=>setClick('Seminar')} className={click === 'Seminar' ? 'active' : ''}>Seminar</button>
        </div>
        <div className="event_card">
          {
            Data.filter((item)=> click === "All" ? true : item.cat === click).map((item)=>{
              return(
                <Card key={item.id} item={item} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Event