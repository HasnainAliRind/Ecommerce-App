import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DiscountedProductsCard from './DiscountedProductsCard';
import FourZeroFour from '../FourZeroFour';

function DiscountedProductsHomePage() {

    
  let [discountedProducts , setDIscountedProducts] = useState(null)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-node-app.vercel.app/products'); 
        let products = response.data.filter((product)=>product.price.discounted === true);
        setDIscountedProducts(products.filter((product, i)=>i<3))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])


  const AddToHistory = (product) =>{
    let AllRecentProducts = localStorage.getItem("Recently_Visited_Products");
    if (AllRecentProducts !== null) {
      let AllItems = JSON.parse(AllRecentProducts);
      let isAlreadyPresent = AllItems.some(item=>item.asin === product.asin)
      if (isAlreadyPresent) {
        let filteredItems = AllItems.filter(item=>item.asin !== product.asin);
        filteredItems.unshift(product)
        localStorage.setItem("Recently_Visited_Products",JSON.stringify(filteredItems))
      }else{
        AllItems.push(product)
        localStorage.setItem("Recently_Visited_Products",JSON.stringify(AllItems))
      }
    }else{
      let AllProducts = []
      AllProducts.push(product);
      localStorage.setItem( "Recently_Visited_Products" , JSON.stringify(AllProducts))
    }
  }

  return (
    <div className='DiscountedProductsHomePage'>
        <h2>Huge Savings, Big Selection: <span>Shop Now!</span></h2>
        <div className='products'>
        { discountedProducts !== null ? discountedProducts.map((product)=>{
          return <DiscountedProductsCard key={product.asin} product={product}/>   
        }) : <FourZeroFour title="Unable to load products" message="Server error has been encountered!, Refresh The Page & Try Again."/>
        }
        </div>
      </div>
  )
}

export default DiscountedProductsHomePage
