import React, { useContext, useState } from 'react'
import { FaCalendarAlt, FaFacebookF, FaFacebookSquare, FaHome, FaMinus, FaPlus, FaStreetView } from "react-icons/fa";
import './single.css'
import { FaLocationDot } from 'react-icons/fa6';
import { storeContext } from '../Context/Context';
import { Link, useParams } from 'react-router-dom'

const Single = () => {

  const { increase, decrease, ticket } = useContext(storeContext)

  
    const calculateTotal = ticket.reduce((acc, item) => acc + item.quantity * item.price, 0);
  

  console.log(ticket)


  return (
    <div className='single'>
      <div className="first">
        <img src="./pic/stu1.jpg" alt="" />
        <div className="global">
          <div className="conference">
            <h1>Global Emergence Conference</h1>
            <button>901 tickets remaining</button>
          </div>
          <div className="venue">
            <FaHome />
            <p>Light Nation Auditorium. Ibadan</p>
          </div>
          <div className="venue">
            <FaLocationDot />
            <p>Former fun factory, Osuntokun, Bodija Ibadan.</p>
          </div>
          <div className="venue">
            <FaCalendarAlt />
            <p> 09:00am - Saturday, 02nd November, 2024</p>
          </div>
        </div>
        <div className="description">
          <button>Description</button>
          <button>Get Tickets</button>
          <button>Location</button>
        </div>
        <div className="descript">
          <p>“???? Get ready to ride the Amapiano Waves! ???? Lagos, we’re bringing the hottest beats, electrifying vibes, and unforgettable energy. Don’t miss out on this epic night—let’s make it a wave to remember! ????????”</p>
        </div>
        <div className="tickets">
          <h3>Get Tickets</h3>
          <div className="ticks">
            {
              ticket.map((item) => {
                return (
                  <div className="ticket" key={item.id}>
                    <div className="incr">
                      <p>{item.name}</p>
                      <span>{item.price}</span>
                    </div>
                    <div className="decr">
                      <button disabled={item.quantity === 0} onClick={() => decrease(item)}><FaMinus />
                      </button>
                      <p>{item.quantity || 0}</p>
                      <button onClick={() => increase(item)}><FaPlus />
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="locate">
          <h3>Location</h3>
          <button><FaStreetView />
            Street View</button>
        </div>
      </div>
      <div className="second">
        <div className="seco">
          <div className="img">
            <p>Music</p>
            <span>Freeborn</span>
          </div>
          <div className="vibes">
            <h3>S.H.E IGNITES MOMS WORKSHOP 1.0: POWERED BY VIRTUEFIED MOMS GROUP</h3>
            <hr />
            <p>Booking Summary</p>
            <hr />
            <div className="sub">
              {
                ticket
                .filter((item) => item.quantity > 0)
                .map((item) => (
                  <div className="subt" key={item.id}>
                    <h4>{item.name}</h4>
                    <p>₦{item.quantity * item.price} <span>x{item.quantity}</span></p>
                  </div>
                ))
              }
            </div>
            <div className="total">
              <p>Total: ₦{calculateTotal}</p>
              <span></span>
            </div>
            <Link to='/booking'><button>Book Now</button></Link>
          </div>
        </div>
        <div className="summ">
          <div className="organize">
            <div className="by">
              <span>Organized by</span>
              <Link to='/user'><h3>Okoro Ifeoma</h3></Link>
            </div>
            <img src="./pic/stu1.jpg" alt="" />
          </div>
          <hr />
          <div className="socials">
            <div className="social">
              <FaFacebookSquare />
              <p>Facebook</p>
            </div>
            <div className="social">
              <FaFacebookSquare />
              <p>Twitter</p>
            </div>
            <div className="social">
              <FaFacebookSquare />
              <p>Instagram</p>
            </div>
          </div>
        </div>
        <div className="share">
          <button><FaFacebookF /> Share
          </button>
          <button><FaFacebookF /> Share
          </button>
          <button><FaFacebookF /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default Single