import React, { useEffect, useState } from 'react'
import SpecificProduct from './SpecificProduct'
import './CurrentProduct.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import RelatedProducts from './RelatedProducts'
import FourZeroFour from '../FourZeroFour'
import LoadingSpinner from '../LoadingSpinner'

function CurrProduct() {
  let nowProduct = useSelector(state => state.appstate.currentProduct)
  let [product , setProduct] = useState(null)
  let [loading , setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {

        const response = await axios.get(`https://backend-node-app.vercel.app/products/${nowProduct}`);
        setProduct({product: response.data.product, otherMatchingProducts: response.data.otherMatchingProducts.filter(item=>item.asin!==response.data.product.asin)});
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetch()
  }, [nowProduct])

  return (
   !loading ? <div className='specific_product'>
      {
        product !== null ? <>
        <SpecificProduct product={product.product}/>
        <RelatedProducts otherMatchingProducts={product.otherMatchingProducts}/>
        </> : <FourZeroFour title="Hey There!" message="Your go-to destination for smart shopping, online today!" btnTitle="Start Shopping" link="/products"/>
      }
    </div> : <LoadingSpinner/>
   
  )
}

export default CurrProduct
