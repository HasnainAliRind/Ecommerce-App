import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import FourZeroFour from '../FourZeroFour'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItemTotalPrice, setCartItemUpdation, setCartItems } from '../../Redux/Slice'
function Cart() {
  let CartItemEditor = useSelector(state=>state.appstate.editCartItem)
  let CartItemUpdated = useSelector(state=>state.appstate.cartItemUpdated)
  let [cartPrice , setCartPrice] = useState(0)
  let cartItems = useSelector(state=>state.appstate.cartItems)

  const FixCartPrice = () =>{
    let cart = JSON.parse(localStorage.getItem("wisechoice_cart"));
    let totalPrice = 0
    cart.forEach(item => {
      let price = item.product.price.current_price * item.count
      totalPrice = totalPrice + price
    });
    return totalPrice
  }


  let dispatch = useDispatch()
    useEffect(()=>{
      let cart = localStorage.getItem("wisechoice_cart");
      if (cart !== null) {
        let AllCartProducts = JSON.parse(cart)
        dispatch(setCartItems(AllCartProducts))
        let price = FixCartPrice()
        setCartPrice(price);
      }else{
        dispatch(setCartItems(null))
      }
    }, [])
    
    useEffect(()=>{
      if (CartItemUpdated === true) {
        setCartPrice(0)
        let price = FixCartPrice()
        setCartPrice(price);
        dispatch(setCartItemUpdation(false))
      }
    }, [CartItemUpdated])
  return (
    <div className='cart'>
      <h2>Your Cart <i className='fas fa-shopping-cart'></i></h2>
        <div className='cartproducts'>
          {
            cartItems !== null && cartItems.length > 0 ? cartItems.map((item)=>{
                return <CartItem key={item.product.asin} item={item} FixCartPrice={FixCartPrice}/>
            }) : <FourZeroFour title="Cart Is Empty" message="There is no product in your cart, your cart is empty as yet!"/>
          }
          
        </div>
        {
            cartItems !== null && cartItems.length > 0 && <h3 className='totalPrice' style={{textAlign: 'center', padding: '20px 0px'}}>Total Price ${cartPrice.toFixed(2)}</h3>
        }
    </div>
  )
}

export default Cart
