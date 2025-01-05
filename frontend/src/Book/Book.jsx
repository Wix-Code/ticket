import React, { useContext, useEffect, useState } from 'react'
import './book.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../Context/Context'
import {FaPlus, FaMinus} from 'react-icons/fa'
import axios from 'axios'

const Book = () => {

  const { data} = useContext(storeContext)
  const [bookTick, setBookTick] = useState([])

  //console.log(data, "booking")

  useEffect(()=>{
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8800/api/event',{
        withCredentials: true
      })
      setBookTick(res.data.message)
      console.log(res.data.message, "messaging")
    }

    fetchData()
  },[setBookTick])
  
  const [drop, setDrop] = useState(false)
  const calculateTotal = data?.ticket?.reduce((acc, item) => acc + item.quantitySelected * item.price, 0);

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
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <div className="purchase_name">
              <label htmlFor="">Phone No</label>
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
              bookTick?.ticket?.filter((item) => item.quantitySelected > 0).map((item) =>{
                return(
                  <div className="owner_map" key={item._id}>
                    <p>{item.name} Owner's Detail</p>
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
              <p>{bookTick?.cat}</p>
              <span>{data?.venue}</span>
            </div>
            <div className="vibes">
              <h3>{data?.title}</h3>
              <hr />
              <p>Booking Summary</p>
              <hr />
              <div className="sub">
                {
                  data?.ticket?.filter((item) => item.quantitySelected > 0)
                  .map((item) => (
                    <div className="subt" key={item._id}>
                      <h4>{item.name}</h4>
                      <p>₦{item.quantitySelected * item.price} <span>x{item.quantitySelected}</span></p>
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