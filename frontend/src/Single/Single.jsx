import React, { useContext, useEffect, useState } from 'react'
import { FaCalendarAlt, FaFacebookF, FaFacebookSquare, FaHome, FaMinus, FaPlus, FaStreetView } from "react-icons/fa";
import './single.css'
import { FaLocationDot } from 'react-icons/fa6';
import { storeContext } from '../Context/Context';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const Single = () => {

  const {id} = useParams()
  const [addTick, setAddTick] = useState([])
  const { ticket, setData, data, token } = useContext(storeContext)

  console.log(data, "data")

  const userData = JSON.parse(localStorage.getItem('user')) || null
  const user = userData?.info?._id
  //userid = user?._id
  console.log(user, "user")

  const increase = async (ticketId) => {

    /*const exist = data?.ticket?.find((item) => {
      return item._id === item._name
    })

    console.log(exist, "exists")
    setData(
     data?.ticket?.map(ticket =>
        ticket._id === itemId._id ? { ...exist, quantitySelected: exist.quantitySelected + 1 } : ticket
      )
    ); */
    const payload = {
      price: ticketId?.price,
      name : ticketId?.name,
      userId : user
    }
    const res = await axios.post(`http://localhost:8800/api/event/${id}/increase`,payload, { headers: { 
      'Authorization': `Bearer ${token}`,  // If you're using Bearer token
      'Content-Type': 'application/json'
    },
      withCredentials : true
    })
    setData(res.data.data)
  }

  const decrease = async (ticketType) => {

    /*const exist = data?.ticket?.find((item) => {
      return item._id === itemId._id
    })

    console.log(exist, "exists")
    setData(
      data?.ticket?.map(ticket =>
        ticket._id === itemId._id ? { ...exist, quantitySelected: exist.quantitySelected - 1 } : ticket
      )
    );
 
    const name = {
      name: ticket.name
    }*/
    const res = await axios.post(`http://localhost:8800/api/event/${id}/decrease`, {name: ticketType}, {
      withCredentials : true
    });
    setData(res.data.data);
  }   
  
  const calculateTotal = data?.ticket?.reduce((acc, item) => acc + item.quantitySelected * item.price, 0);
   
  useEffect(()=>{
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/api/event/${id}`,{
        withCredentials: true
      })
      setData(res.data.message)
      console.log(res.data.message, "message")
    }

    fetchData()
  },[setData, id])
  //console.log(ticket)

  return (
    <div className='single'>
      <div className="first">
        <img src={data?.image} alt="" />
        <div className="global">
          <div className="conference">
            <h1>{data?.title}</h1>
            <button>901 remaining</button>
          </div>
          <div className="venue">
            <FaHome />
            <p>{data?.state}</p>
          </div>
          <div className="venue">
            <FaLocationDot />
            <p>{data?.venue}</p>
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
          <p>{data?.description}</p>
        </div>
        <div className="tickets">
          <h3>Get Tickets</h3>
          <div className="ticks">
            {
              data?.ticket?.map((item) => {
                return (
                  <div className="ticket" key={item._id}>
                    <div className="incr">
                      <p>{item.name}</p>
                      <span>{item.price}</span>
                    </div>
                    <div className="decr">
                      <button disabled={item.quantitySelected === 0} onClick={() => decrease(item)}><FaMinus />
                      </button>
                      <p>{item.quantitySelected || 0}</p>
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