import React, { useEffect, useState } from 'react'
import FourZeroFour from '../FourZeroFour';
import Products from '../ProductsSection/Products';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../Redux/Slice';

function HistorySection() {

    let [recentlyVisitedProducts , setRecentlyVisitedProducts] = useState(null)
    let dispatch = useDispatch()
    useEffect(()=>{
        let AllRecentProduct = localStorage.getItem("Recently_Visited_Products");
        if (AllRecentProduct !== null) {
          let Products = JSON.parse(AllRecentProduct)
          console.log(Products);
          setRecentlyVisitedProducts(Products)
        }else{
          setRecentlyVisitedProducts(null)
        }
    }, [])

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
    <div className='HistorySection'>
      <h2>{recentlyVisitedProducts !== null && "Recently visited Products." }</h2>
      <div className='AllRecentProduct'>
            {
                recentlyVisitedProducts !== null ? recentlyVisitedProducts.map((product)=>{
                    return <div className="product_card" key={product.asin}>
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
                          dispatch(setCurrentProduct(product.asin))
                        }}>Buy Now</button>
                        <button className="cart-btn" onClick={()=>{AddToCart(product)}}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                }) : <FourZeroFour title="You'll see your product history here once you've visited products."/>
            }
      </div>
    </div>
  )
}

export default HistorySection
