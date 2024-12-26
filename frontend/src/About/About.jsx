import React, { useState } from 'react'
import './about.css'
import { Abot } from '../Data'
import { useEffect } from 'react'

const About = () => {


  const [slide, setSlide] = useState(0)

 

  const data = [
    {
      id: 1,
      img: './pic/cov.jpg',
      title: 'Find Events Around You',
      desc: 'Tickethub.ng is built to be the fastest and easiest way to sell tickets to your events.',
      submit: 'See more',
      path: false
    },
    {
      id: 2,
      img: './pic/stu1.jpg',
      title: 'Find Events Around You',
      desc: 'Tickethub.ng is built to be the fastest and easiest way to sell tickets to your events.',
      submit: 'See more',
      path: true
    }
  ]

  //const element = document.getElementById("div").addEventListener("scroll", () => {
    

  const goTo = (direct) => {
    let next;

    if(direct === 'prev'){
      next = slide === 0? data.length - 1 : slide - 1
    } else{
      next = slide === data.length - 1? 0 : slide + 1
    }


    const container = document.getElementById('div');
    container.style.transform = `translateX(-${next * 100}%)`;

    setSlide(next);

  }

  useEffect(()=> {
    //goTo();
  })

  

  return (
    <div>
      <div className="slide">
              <div className="slid" id='div' style={{backgroundImage : `url(${data[slide].img})`}}>
                <button onClick={() => goTo('prev')}>n</button>
                <div className="slide_content">
                  <h1>{data[slide].title}</h1>
                  <p>{data[slide].desc}</p>
                </div>
                <button onClick={() => goTo('nxt')}>p</button>
              </div>
      </div>
      <div className="about_icon">
        <h1>Buy and sell tickets faster and easier online</h1>
        <p>Tickethub.ng is your number one fast, easy, secure ticketing platform, <br />with a wide range of services ready to give you the best experience <br />as an event organizer or attendee</p>
        <div className="about_map">
          {
            Abot.map((item) => {
              return(
                <div className="icons">
                  <span>{item.img}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default About