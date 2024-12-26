import React from 'react';
import './home.css'
import Event from '../Components/Event';
import Host from '../Components/Host';
import Hero from '../Components/Hero';
import Revolution from '../Components/Revolution';

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <Event />
      <Host />
      <Revolution />
    </div>
  )
}

export default Home