import React from 'react'
import Navbar from './Navbar'
import headerImage from '../../images/headerImage.png'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='header'>
   
      <div className='header_content'>
        <div className='content'>
            <p>Your go-to destination<br /> for smart shopping, <br />  online today!</p>
             
            <button><Link to={"/products"}>Let's Shop</Link></button>
        </div>
        <div className='image'>
            <img src={headerImage}/>
        </div>
      </div>
    </div>
  )
}

export default Header
