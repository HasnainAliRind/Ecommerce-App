import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCardDesign from './FeaturedProducts';
import FourZeroFour from '../FourZeroFour';
import LoadingSpinner from '../LoadingSpinner';
import { Link } from 'react-router-dom';


function SuggestedProducts() {
  const [apiData, setApiData] = useState([]);
  let [loading ,setloading] = useState(true)
  useEffect(() => {

    
    
    const fetchData = async () => {
      let AllProducts = []
      setloading(true)
      try {
        const featuredCategories = ['Gaget', 'clocks', 'Clothing Accessories', 'Baking Supplies', 'Toys & Games' , 'Cleaning_Supplies'];
        for (const category of featuredCategories) {
          const response = await axios.get(`https://backend-node-app.vercel.app/products/category/${category}`);
          console.log(response);
          const data = response.data;
          AllProducts.push(data[2]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      if (AllProducts > 0) {
        setloading(false)
        setApiData(AllProducts);
      }else{
        setloading(false)
        setApiData(AllProducts);
      } 
    };

   fetchData();

    

  }, []);

  return (
    <div className='homePageProducts'>
      <div className="one">
        <h2>Feature Products</h2>
      </div>
      { !loading ? <div className='featureProducts'>{
          apiData.length > 0 ? apiData.map((product)=>{
            return <ProductCardDesign key={product.asin} product={product}/>
          }) : <FourZeroFour title="Unable to load products" message="Server error has been encountered!, Refresh The Page & Try Again."/>
        }

       </div> : <LoadingSpinner/> }
     
       {apiData.length > 0 && <div className='getAllBtn'><button><Link to={"/products"}>Get All <i className='fas fa-arrow-right'></i></Link></button></div>}
    </div>   
  )
}

export default SuggestedProducts
