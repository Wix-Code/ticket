import React, { useContext, useState } from 'react'
import './find.css'
import { Data } from '../Data'
import Card from '../Components/Card'
import { FaAngleDown, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import { storeContext } from '../Context/Context'

const FindEvents = () => {

  const { data } = useContext(storeContext)
  const [choose, setChoose] = useState("All")
  const [open, setOpen] = useState(false)

  const Select = (value) => {
    setChoose(value)
    setOpen(false)
  }

  const [select, setSelect] = useState("Default")
  const [show, setShow] = useState(false)

  const handleSelect = (value) => {
    setSelect(value)
    setShow(false)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust items per page as needed

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Paginate data
  const paginatedData = Array.isArray(data) && data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const clickOpen = (direct) => {
    if(direct === "i"){
      setOpen(!open)
      setShow(false)
    }
    else if(direct === "t"){
      setShow(!show)
      setOpen(false)
    }
  }

  return (
    <div className='find'>
      <div className="findhero">
        <div className="findhead">
          <h1>Find Events</h1>
          <div className="list">
            <span>home</span>
            <FaAngleRight style={{fontSize: 10,}} />
            <p>listings</p>
          </div>
        </div>
      </div>
      <div className="search_list">
        <input type="text" placeholder='What would you like to find' name="" id="" />
        <div className="show_select">
          <button onClick={()=>clickOpen('i')} >{choose}</button>
          {
            open && <div className="open">
            <p onClick={() => Select("All")} >All</p>
            <p onClick={() => Select("Theater")}>Theater</p>
            <p onClick={() => Select("Theater")}>Theater</p>
            <p onClick={() => Select("Concerts")}>Concerts</p>
          </div>
          }
        </div>
        <button className='bt'>Search</button>
      </div>
      <div className="find_search">
        <div className="order">
          <button onClick={()=>clickOpen('t')} >{select} { show ?<FaAngleUp /> : <FaAngleDown />}
          </button>
          {
            show && <div className="default">
            <p onClick={() => handleSelect("Default")} >Default Order</p>
            <p onClick={() => handleSelect("Highest")}>Highest Order</p>
            <p onClick={() => handleSelect("Newest")}>Newest Events</p>
            <p onClick={() => handleSelect("Oldest")}>Oldest Events</p>
          </div>
          }
        </div>
      </div>
      <div className="find_results">
        {
          Array.isArray(paginatedData) && paginatedData.map((item)=>{
            return (
              <Card item={item} key={item.id} />
            )
          })
        }
      </div>
      <div className="pagination">
        { 
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))
        }
      </div>

    </div>
  )
}

export default FindEvents