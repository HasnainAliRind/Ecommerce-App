import React from 'react'
import image from "../ProductsSection/headphone.png"
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../Redux/Slice';

function ResultProduct(props) {

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

  let dispatch = useDispatch()
  return (
    <div className='searchedProductCard'>
        <div className='image'>
          <img src={props.product.thumbnail} alt='NotFounding'/>
        </div>
        <div className='information'>
          <p className='category'>{props.product.category}</p>
          <p className='title'>{`${props.product.title}`.length <= 46 ? props.product.title : `${props.product.title}`.slice(0,46)}</p>
        </div>
        <div className='buttons'>
          <button onClick={()=>{
            AddToHistory(props.product)
            dispatch(setCurrentProduct(props.product.asin))
          }}>Buy Now</button>
        </div>
    </div>
  )
}

export default ResultProduct
