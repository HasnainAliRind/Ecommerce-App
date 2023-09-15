import React, { useRef, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { setSearchQuery, setSidebar } from '../Redux/Slice';
import { Link } from 'react-router-dom';

function SideBar() {
    let sidebar = useSelector((state)=>state.appstate.sidebar)
    let dispatch = useDispatch()
    let searchQuery = useSelector(state=>state.appstate.searchQuery);
    let [searchQ , setSearchQ] = useState(searchQuery)
    let searchComponentLink = useRef()
    function Redirector(signal) {
        signal && searchComponentLink.current.click()
    }
    return (
        <div className='sidebar' style={{right: sidebar ? '0' : '-150%'}}>
            <div className='logo'>WiseChoices</div>
            <div className='menus'>
               <div className='searchbar'>
                    <div className='searchfield'>
                        <input type='text' placeholder='Search For Products Here!' onChange={(e)=>{
                    setSearchQ(e.target.value)
                }} onKeyUp={(e)=>{
                    if (e.key === "Enter") {
                        dispatch(setSearchQuery(searchQ))
                        dispatch(setSidebar(false))
                        Redirector(true)
                    }
                }}/>
                    </div>
                </div> 
                {/* A hidden Link */}
                <Link to={searchQ === "" ? "/" : "/search"} style={{display: 'none'}} ref={searchComponentLink}>Search</Link>
               <Link to="/"><li><i className="fas fa-home"></i>Home</li></Link>
               <Link to="/products"><li><i className="fas fa-cube"></i>Products</li></Link>
               <Link to="/discounts"><li><i className="fas fa-gift"></i>Discounted Products</li></Link>
               <Link to="/cart"><li><i className="fas fa-shopping-cart"></i>Products Cart</li></Link>
               <Link to="/history"><li><i className="fas fa-history"></i>Products History</li></Link>
               <Link to="/developer"><li><i className="far fa-user"></i>About Developer</li></Link>
            </div>
            <button id='closeBtn' onClick={()=>{
                dispatch(setSidebar(false))
            }}><i className='fas fa-times'></i>Close</button>
        </div>
    )
}

export default SideBar
