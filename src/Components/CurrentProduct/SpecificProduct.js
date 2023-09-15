import React from 'react'

function SpecificProduct(props) {
 
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

    <div className="card">
      <div className="card__title">
        <div className="icon">
          <a href="#"><i className="fa fa-arrow-left"></i></a>
        </div>
        <h3>Product</h3>
      </div>
      <div className="card__body">
        <div className="half">
          <div className="featured_text">
            <p className="sub">{props.product.category}</p>
            <p className="price">${props.product.price.current_price}</p>
          </div>
          <div className="image">
            <img src={ props.product.thumbnail} alt="" />
          </div>
        </div>
        <div className="half">
          <p className='title'>{props.product.title}</p>
          <div className="description">
            <p>{props.product.discription}</p>
          </div>
          <span className="stock"><i className="fa fa-pen"></i> In stock</span>
          <div className="reviews">
            <ul className="stars">
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star"></i></li>
              <li><i className="fa fa-star-o"></i></li>
            </ul>
            <span>({props.product.reviews.total_reviews} reviews)</span>
          </div>
        </div>
      </div>
      <div className="card__footer">
        <div className="recommend">
          <p>Recommended by</p>
          <h3>WiseCoice</h3>
        </div>
        <div className="action">
          <button type="button" onClick={()=>{AddToCart(props.product)}}>Add to cart</button>
          <button type="button" className='AmazonBtn'><a href={props.product.url} target='_blank'><i className='fab fa-amazon'></i>Amazon</a></button>
        </div>
      </div>
    </div>

  )
}

export default SpecificProduct
