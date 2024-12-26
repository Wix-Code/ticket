import React from 'react'
import { Data } from '../Data'
import './userposts.css'
import Card from '../Components/Card'

const Usersposts = () => {
  return (
    <div className='user_posts'>
      <div className="userprofile">
        <div className="userpro">
          <img src="./pic/cov.jpg" alt="" />
          <h4>Name: Ogbonna Wisdom</h4>
          <p>08126829146</p>
          <a href="mailto:ogbonna428alex@gmail.com">ogbonna428alex@gmail.com</a>
        </div>
      </div>
      <div className="userposts">
        {
          Data.map((item)=>{
            return (
              <Card item={item} key={item.id}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Usersposts