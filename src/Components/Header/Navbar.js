import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setSearchQuery, setSidebar} from '../../Redux/Slice'
import{ 
    Link
} from "react-router-dom";
import logo from './Logo.png'

function Navbar() {

    let dispatch = useDispatch();
    let searchQuery = useSelector(state=>state.appstate.searchQuery);
    let [searchQ , setSearchQ] = useState(searchQuery)
    let searchComponentLink = useRef()

    function Redirector(signal) {
        signal && searchComponentLink.current.click()
    }

  return (
    <div className='Navbar'>
        <Link to={searchQ === "" ? "/" : "/search"} style={{display: 'none'}} ref={searchComponentLink}>Search</Link>
        <div className='logo'>
            <img src={logo} alt='NotFoudning'/>
            Wise<span>Choice</span>
        </div>
        <div className='SearchBar'>
            <div className='search'>
                <input type='search' placeholder='Search The Products' value={searchQ} onChange={(e)=>{
                    setSearchQ(e.target.value)
                }} onKeyUp={(e)=>{
                    if (e.key === "Enter") {
                        dispatch(setSearchQuery(searchQ))
                        Redirector(true)
                    }
                }}/>    
                <button>Search</button>
            </div>
        </div>
        <div className='Menus'>
            <Link to="/" className="homeBTN"><li><i className='fas fa-home'></i></li></Link>
            <Link to="/cart" className="cartBTN"><li><i className='fas fa-shopping-cart'></i></li></Link>
            <li onClick={()=>{
                dispatch(setSidebar(true))
            }}><i className='fas fa-bars'></i></li>
            
        </div>
    </div>
  )
}

export default Navbar
