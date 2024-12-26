import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Home from './Home/Home';
import Blog from './Blog/Blog';
import Login from './Login/Login';
import Register from './Login/Register';
import CreateEvent from './CreateEvent/CreateEvent';
import Single from './Single/Single';
import FindEvents from './Find/FindEvents';
import About from './About/About';
import Contact from './Contact/Contact';
import UserPosts from './UserPost/UserPosts';
import Book from './Book/Book';

const Rout = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Register />}/>
        <Route path='/create' element={<CreateEvent />}/>
        <Route path='/blog' element={<Blog />}/>
        <Route path='/booking' element={<Book />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/find' element={<FindEvents />}/>
        <Route path='/:id' element={<Single />}/>
        <Route path='/user' element={<UserPosts />}/>
      </Routes>
    </div>
  )
}

export default Rout