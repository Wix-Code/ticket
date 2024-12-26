import React, { useContext, useState } from 'react'
import './book.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../Context/Context'
import {FaPlus, FaMinus} from 'react-icons/fa'

const Book = () => {

  const {ticket} = useContext(storeContext)
  
  const [drop, setDrop] = useState(false)
  const calculateTotal = ticket.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className='booking'>
      <div className="complete">
        <h1>Complete Booking</h1>
        <div className="completes">
          <span>Home</span>
          <span>Booking</span>
        </div>
      </div>
      <div className="bookin">
      <div className="bookings">
        <div className="purchase">
          <h2>Purchase's Details</h2>
          <div className="purchase_name">
            <label htmlFor="">Full Name</label>
            <input type="text" />
          </div>
          <div className="purchased">
            <div className="purchase_name">
              <label htmlFor="">Full Name</label>
              <input type="text" />
            </div>
            <div className="purchase_name">
              <label htmlFor="">Full Name</label>
              <input type="text" />
            </div>
          </div>
          <div className="tick">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Would you like to use the same information for all other ticket(s)?</label>
          </div>
          <div className="ticket_owner">
            <div  onClick={() => setDrop(!drop)} className={ drop ? "ticket_dropdown" : "tick_drop"}>
              <p>Ticket Owner(s) Information</p>
              <button className={drop ? "button" : "buton"}>{ drop ? <FaPlus /> : <FaMinus />}</button>
            </div>
           {
            drop &&  <div className="owners">
            {
              ticket.filter((item) => item.quantity > 0).map((item) =>{
                return(
                  <div className="owner_map">
                    <p>{item.id}. {item.name} Owner's Detail</p>
                    <div className="purchase_name">
                      <label htmlFor="">Full Name</label>
                      <input type="text" />
                    </div>
                    <div className="purchased">
                      <div className="purchase_name">
                        <label htmlFor="">Email</label>
                        <input type="email" />
                      </div>
                      <div className="purchase_name">
                        <label htmlFor="">Phone</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="tick">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="">Use purchaser's information here?</label>
                    </div>
                  </div>
                )
              })
            }
          </div>
           }
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
                  ticket.filter((item) => item.quantity > 0)
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
              <Link to='/booking'><button>Complete Booking</button></Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Book