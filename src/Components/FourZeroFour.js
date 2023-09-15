import React from 'react'
import logo from './Header/Logo.png'
import { Link } from 'react-router-dom';

function FourZeroFour(props) {
 
  return (
    <div style={{textAlign: 'center'}} className='FourZeroFour'>
        <img src={logo} alt='LOGO'/>
        <h2>{props.title !== undefined ? props.title : "Something Went Wrong!"}</h2>
        <p>{props.message  !== undefined ? props.message : "The Error has been occured! To Fix kindly press the button below"}</p>
        <div className='btn'>
          <button style={{display: props.btnDisplay !== undefined && props.btnDisplay ? "block" : "none"}}><Link to={props.link  !== undefined ? props.link : "/"}>{props.btnTitle  !== undefined ? props.btnTitle : "Fix it"}</Link></button>
        </div>
    </div>
  )
}

export default FourZeroFour
