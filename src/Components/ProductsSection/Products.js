import axios from 'axios';
import React, { useEffect, useState } from 'react'
import image from './headphone.png'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProduct } from '../../Redux/Slice';
import FourZeroFour from '../FourZeroFour';
import LoadingSpinner from '../LoadingSpinner';
function Products(props) {

    let [Products , setProducts] = useState(null)
    let currentCategory = useSelector(state=>state.appstate.currentCategory)
    let [loading, setLoading] = useState(true)
    useEffect(()=>{
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`https://backend-node-app.vercel.app/products/category/${currentCategory.category}`); 
          let products = response.data;
          setProducts(products)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [currentCategory])


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
    const AddToCart = (product) =>{
      let cart = localStorage.getItem("wisechoice_cart")
      if (cart !== null) {
        let cartItems = JSON.parse(cart)
        let isPresent = cartItems.some(item=>item.product.asin === product.asin);
        if (isPresent) {
            let presentProductInArray = cartItems.filter(item=>item.product.asin === product.asin)
            let presentProduct = presentProductInArray[0];
            presentProduct.count = presentProduct.count += 1
            let AllOtherProducts = cartItems.filter(item=>item.product.asin !== product.asin);
            AllOtherProducts.unshift(presentProduct)
            localStorage.setItem("wisechoice_cart", JSON.stringify(AllOtherProducts))
        }else{
            let NewProduct = {count: 1 , product}
            cartItems.unshift(NewProduct);
            localStorage.setItem("wisechoice_cart", JSON.stringify(cartItems))
        }
      }else{
          let cartItems = []
          cartItems.push({count: 1 , product: product})
          localStorage.setItem("wisechoice_cart", JSON.stringify(cartItems))
      }
    }
    let dispatch = useDispatch()
  return (
    <div className='ProductsSide'>
      <h2>{currentCategory.category}</h2>
        {
          !loading ? <div className='product_cards'>
            {
               Products !== null ? Products.map((product,index)=>{
                    return  <div className="product_card" key={product.asin} onClick={()=>{
                      AddToHistory(product)
                    }}>
                    <img src={product.thumbnail} alt='Not Founding...,' />
                    <div className="content">
                      <div className="row">
                        <div className="details">
                          <span>{product.category}</span>
                          <p>{`${product.title}`.length <= 65 ? product.title : product.title.slice(0,65) + "..."}</p>
                        </div>
                        <div className="price">${product.price.current_price}</div>
                      </div>
                      <div className="buttons">
                        <button onClick={()=>{
                          AddToHistory(product)
                          dispatch(setCurrentProduct(product.asin)) 
                        }}>Buy Now</button>
                        <button className="cart-btn" onClick={()=>{AddToCart(product)}}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                }) : <FourZeroFour title="Server Error" message="Server error has been encountered!, Refresh The Page & Try Again."/>
              
            }
        </div> : <LoadingSpinner/> 
        
        }
    </div>
  )
}

export default Products
