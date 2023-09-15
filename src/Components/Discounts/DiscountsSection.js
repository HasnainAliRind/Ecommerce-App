import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Rating from '../Rating'
import { useDispatch} from 'react-redux';
import { setCurrentProduct } from '../../Redux/Slice';
import FourZeroFour from '../FourZeroFour';
import LoadingSpinner from '../LoadingSpinner';

function DiscountsSection() {

    let [Products, setProducts] = useState(null)
    let [filterComponent , setFilterComponent] = useState(false);
    let [loading , setLoading] = useState(true);
    let dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://backend-node-app.vercel.app/products`);
                let products = response.data.filter(item => item.price.discounted === true);
                setProducts(products)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetch()
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
        <div className='DiscountsSection'>
            
            <div className='TopComponent'>
                <h2>Get Discounts , Save Money , Enjoy Life With Wise Choices!!</h2>
            </div>
           
            {!loading ? <div className='AllDiscountedProducts'>
                {
                    Products !== null ? Products.map((item) => {
                        return <div className='discountedProduct' key={item.asin}>
                            <div className='rates'>
                                <Rating rating={item.reviews.rating}/>
                            </div>
                            <div className='image'>
                                <img src={item.thumbnail} alt='not founding'/>
                            </div>
                            <div className='information'>
                                <div className='price'>
                                    <p className='before_price'>Rs. {item.price.before_price}$</p>
                                    <p className='after_price'>Rs. {item.price.current_price}$ <span><i className='fas fa-check'></i></span></p>
                                </div>
                                <div className='buttons'>
                                    <button onClick={()=>{
                                        AddToHistory(item)
                                        dispatch(setCurrentProduct(item.asin))
                                    }}>Buy Now</button>
                                    <button onClick={()=>{AddToCart(item)}}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    }) : <FourZeroFour title="Server Error" message="Server error has been encountered! To Fix Refresh The Page & Try Again."/>
                }
            </div>
            : <LoadingSpinner/> }
        </div>
    )
}

export default DiscountsSection
