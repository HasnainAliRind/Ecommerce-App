import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItemEditor } from '../../Redux/Slice'

function CartItem(props) {
  let dispatch = useDispatch()
  return (
    <div className='cartItem'>
      <div className='image'>
        <img src={props.item.product.thumbnail} alt="Not Founding"/>
      </div>
      <div className='information'>
        <p className='category'>{props.item.product.category}</p>
        <p className='title'>{`${props.item.product.title}`.length <= 30 ? `${props.item.product.title}` : `${props.item.product.title}`.slice(0,30) + "..."}</p>
      </div>
        {
          props.item.product.price.discounted ? <div className='price'><p className='before_price'>${props.item.product.price.before_price}</p><p className='after_price'>${props.item.product.price.current_price}</p></div> : <div className='price'><p className='current_price'>${props.item.product.price.current_price}</p></div>
        }
      <div className='others'>
        <button onClick={()=>{
          dispatch(setCartItemEditor({status: true , product: props.item}));
        }}><i className='fas fa-edit'></i></button>
      </div>
    </div>
  )
}

export default CartItem
