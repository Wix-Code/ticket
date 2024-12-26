import React from 'react'
import './hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      <h1>Online Event Booking & Ticketing Made Easy</h1>
      <p>Comprehensive platform for event ticketing in Nigeria
      </p>
      <div className="hero_input">
        <input type="text" name="" placeholder='Search for event...' />
      </div>
      <button>Search</button>
    </div>
  )
}

export default Hero