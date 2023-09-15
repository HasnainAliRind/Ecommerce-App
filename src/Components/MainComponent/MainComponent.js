import Header from '../Header/Header'
import SoldProducts from './SoldProducts'
import DiscountedProductsHomePage from './DiscountedProductsHomePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import AllProducts from '../ProductsSection/AllProducts';
import FourZeroFour from '../FourZeroFour';
import Search from '../Search/Search';
import DiscountsSection from '../Discounts/DiscountsSection';
import HistorySection from '../History/HistorySection';
import AboutDeveloper from '../Developer/AboutDeveloper';
import Cart from '../Cart/Cart';
import CurrProduct from '../CurrentProduct/CurrentProduct';

function MainComponent() {
  let location = useLocation()

  return (
    <div className='MainComponent'>
      <Routes>
        <Route exact path='/' element={<>
          <Header />
          <SoldProducts />
          <hr/>
          <DiscountedProductsHomePage />
        </>}></Route>
        <Route path="/products" element={<AllProducts/>}></Route>
        <Route path='/search' element={navigator.onLine ? <Search/>  : <FourZeroFour title="Unable To Search!" message="To search the products you must have a strong internet connection!" btnTitle="Homepage"/>}></Route>
        <Route path='/discounts' element={navigator.onLine ? <DiscountsSection/> : <FourZeroFour title="You're Offline!" message="Oops! You're not connected with internet, kindly connect to the internet and try again."/>}></Route>
        <Route path='/history' element={navigator.onLine ? <HistorySection/> : <FourZeroFour title="You're Offline!" message="Oops! You're not connected with internet, kindly connect to the internet and try again."/>}></Route>
        <Route path='/developer' element={navigator.onLine ? <AboutDeveloper/> : <FourZeroFour title="You're Offline!" message="Oops! You're not connected with internet, kindly connect to the internet and try again."/>}></Route>
        <Route path='/cart' element={ <Cart/>  }></Route>
        <Route path='/products/product' element={<CurrProduct/>}></Route>
        <Route path='*' element={<FourZeroFour title={`${location.pathname} is not a component as yet!`}/>}></Route>
           
      </Routes>
    </div>
  )
}

export default MainComponent
