import React from 'react'
import './footer.css'
import { Paths } from '../Data'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="foote">
        <div className="foot1">
          <h1>ticket.ng</h1>
          <p>Post events in Nigeria, free and paid events. <br />Find events around you, register for free event, buy tickets,<br /> sell tickets online and promote your event in Nigeria.</p>
        </div>
        <div className="foot2">
          <h2>Helpful Links</h2>
          <div className="foot_links">
            {
              Paths.map((item)=>{
                return(
                  <li>{item.title}</li>
                )
              })
            }
          </div>
        </div>
        <div className="foot3">
          <h2>Connect with us</h2>
          <p>WhatsApp: <a href="tel:+2348126829146">+2348126829146</a></p>
          <p>Email: <a href="mailto:ogbonna428alex@gmail.com">ogbonna428alex@gmail.com</a></p>
        </div>
      </div>
      <div className="copyright">
        <p>© 2024 Tickethub.ng. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer