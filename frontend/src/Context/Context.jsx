import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export const storeContext = createContext(null)

const Context = (props) => {
  const navigate = useNavigate()

  const tickets = [
    {
      id: 1,
      name: 'Regular',
      price: 2000,
      quantity: 0

    },
    {
      id: 2,
      name: 'VIP',
      price: 10000,
      quantity: 0

    },
    {
      id: 3,
      name: 'VVIP',
      price: 20000,
      quantity: 0
    }
  ]

  const [ticket, setTicket] = useState(tickets);
  
  const [loading, setLoading] = useState(false)



  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setInputs((prev)=>({...prev,[e.target.name]: e.target.value}))
  }

  const submit = async (e) => {
    e.preventDefault();

   try {
    setLoading(true)
    const res = await axios.post('http://localhost:8800/api/user/login', inputs, {
      withCredentials: true
    });
    localStorage.setItem('user', JSON.stringify(res.data))
    navigate('/create')
    setLoading(false)
   } catch (error) {
    console.log(error)
   }

  }

  const increase = (itemId) => {

    const exist = ticket.find((item) => {
      return item.id === itemId.id
    })

    console.log(exist)
    setTicket(
      ticket.map(ticket =>
        ticket.id === itemId.id ? { ...exist, quantity: exist.quantity + 1 } : ticket
      )
    );
    //console.log(ticket)

  }

  const decrease = (itemId) => {
    const exist = ticket.find((item) => {
      return item.id === itemId.id
    })

    console.log(exist)
    setTicket(
      ticket.map(ticket =>
        ticket.id === itemId.id ? { ...exist, quantity: exist.quantity - 1 } : ticket
      )
    );
  }

  const contextValue = {
    increase, ticket, decrease, submit, handleChange, loading
  }
  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  )
}

export default Context