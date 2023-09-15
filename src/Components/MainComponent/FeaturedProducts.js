import React from 'react'
import RatingStars from '../Rating'
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../Redux/Slice';

function ProductCardDesign(props) {

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

  return (
    <div className='FeatureProductCard'>
       <div className='image' onClick={()=>{AddToHistory(props.product)}}>
        <img src={props.product.thumbnail} alt='Not Founding'/>
        <RatingStars rating={props.product.reviews.rating}/>
       </div>
       <div className='buttons'>
            <button onClick={()=>{
              AddToHistory(props.product)
              dispatch(setCurrentProduct(props.product.asin))  
              }}><i className="fa-solid fa-arrow-up-right-from-square"></i></button>
            {/* <button><i className="fas fa-cart-shopping"></i></button> */}
            
       </div>
    </div>
  )
}

export default ProductCardDesign
