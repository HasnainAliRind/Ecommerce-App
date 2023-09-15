import React, { useEffect, useState } from 'react'
import ResultProduct from '../Search/ResultProduct'
function RelatedProducts(props) {
  let [loading , setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [props])


  return (
    <div className="otherProducts">
      <h2>Other Products</h2>
      <div className='products'>
          { !loading ? 
            props.otherMatchingProducts.map((product, index)=>{
              return <ResultProduct key={`${product.asin}_${index}`} product={product}/>
            }) : <p>Loading...</p>
          }
      </div>
    </div>
  )
}

export default RelatedProducts
