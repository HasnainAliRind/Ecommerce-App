import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItemEditor, setCartItemUpdation, setCartItems, setCurrentProduct } from '../../Redux/Slice'

function EditCartItem() {
    let dispatch = useDispatch()
    let CartItemEditor = useSelector(state => state.appstate.editCartItem)
    let [count, setCount] = useState(CartItemEditor.product.count)
    const SaveChanges = () => {
       
        let cart = JSON.parse(localStorage.getItem("wisechoice_cart"));
        cart.forEach((element, index) => {
            if (element.product.asin === CartItemEditor.product.product.asin) {
                cart[index].count = count;
                dispatch(setCartItemUpdation(true))
                dispatch(setCartItems(cart))
            }
        });
        localStorage.setItem("wisechoice_cart", JSON.stringify(cart))
    }

    const RemoveToCart = (id) => {
        let cart = JSON.parse(localStorage.getItem("wisechoice_cart"));
        cart = cart.filter(item => item.product.asin !== id)
        localStorage.setItem("wisechoice_cart", JSON.stringify(cart))
        dispatch(setCartItemUpdation(true))
        dispatch(setCartItems(cart))
    }

    return (
        <div className='cart_item_editor'>
            <button className='close_btn' onClick={() => {
                dispatch(setCartItemEditor({ status: false, product: null }))
            }}><i className='fas fa-times'></i></button>
            <div className='Editing_Box'>
                <div className='image'>'<img src={CartItemEditor.product.product.thumbnail} alt="not founding" /></div>
                <div className='information'>
                    <p className='category'>{CartItemEditor.product.product.category}</p>
                    <p className='title'>{CartItemEditor.product.product.title}</p>
                </div>
                <div className='count'>
                    <div>
                        <button onClick={() => {
                            if (count > 1) {
                                setCount(count - 1)
                            }
                        }}>-</button>
                        <p className='value'>{count}</p>
                        <button onClick={() => {
                            setCount(count += 1)
                        }}>+</button>
                    </div>
                    <button className='removeButton' onClick={() => {
                        RemoveToCart(CartItemEditor.product.product.asin)
                        dispatch(setCartItemEditor({ status: false, product: null }))
                    }}>Remove To Cart</button>
                </div>
                <div className='savebtn'>
                    <button className='buyBtn' onClick={() => {
                        dispatch(setCurrentProduct(CartItemEditor.product.product.asin))
                        dispatch(setCartItemEditor({ status: false, product: null }))
                    }}>Buy Now</button>
                    <button className='Save' onClick={() => {
                        SaveChanges()
                        dispatch(setCartItemEditor({ status: false, product: null }))
                    }}>Save Changes</button>
                </div>

            </div>
        </div>
    )
}

export default EditCartItem
