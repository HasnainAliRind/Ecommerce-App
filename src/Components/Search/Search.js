import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ResultProduct from './ResultProduct';
import FourZeroFour from '../FourZeroFour';
import LoadingSpinner from '../LoadingSpinner';
function Search() {
    let searchQuery = useSelector(state=>state.appstate.searchQuery)
    let [Products , setProducts] = useState(null)
    let [loading , setLoading] = useState(true)
    useEffect(()=>{
      if (searchQuery !== "") {
        const fetchData = async () => {
          setLoading(true)
          try {
            const response = await axios.get(`https://backend-node-app.vercel.app/products/search/${searchQuery}`); 
            let products = response.data;
            setProducts(products)
            setLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }
    }, [searchQuery])
    
  return (
     !loading ? <div style={{textAlign: 'center'}} className='searchSection'>
        {Products !== null &&  Products.length > 0 && <h2>{Products.length} Results For "{searchQuery}"</h2>}
        <div className='searchedResults'>
            {
              Products !== null && Products.length != 0 ? Products.map((item)=>{
                return <ResultProduct product={item}/>
              }) : <FourZeroFour title="OOPs, No Results!" message="No Results are found, Try to use concise & meaningful keywords"/>
            }
        </div>
    </div> : <LoadingSpinner/>
  )
}

export default Search
