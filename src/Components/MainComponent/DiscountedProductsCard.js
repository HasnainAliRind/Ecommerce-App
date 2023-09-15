import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../Redux/Slice';

function DiscountedProductsCard(props) {
    
      
    let dispatch = useDispatch()
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


      return (
          <div className="table" key={props.product.asin} onClick={() => { AddToHistory(props.product) }}>
              <div className="ribbon"><span>Discounted</span></div>
              <div className="Image">
                  <img src={props.product.thumbnail} alt="ima" />
              </div>
              <div className="buttons">
                  <button className="buy" onClick={() => { 
                    AddToHistory(props.product)
                    dispatch(setCurrentProduct(props.product.asin))  
                  }}>Buy Now</button>
                  <button className="cart" onClick={() => {
                      AddToCart(props.product)
                      dispatch(setCurrentProduct(props.product.asin)) 
                  }}>Add To Cart</button>
              </div>
          </div>
      )
  }


export default DiscountedProductsCard
