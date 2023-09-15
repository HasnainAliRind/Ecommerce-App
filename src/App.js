import './App.css';
import './MediaQueries.css'
import MainComponent from './Components/MainComponent/MainComponent';
import Navbar from './Components/Header/Navbar';
import SideBar from './Components/SideBar';
import { useSelector } from 'react-redux';
import Shadow from './Components/Shadow'
import {
  Link,
  BrowserRouter as Router
} from "react-router-dom";
import EditCartItem from './Components/Cart/EditCartItem';
import { useEffect, useRef } from 'react';


function App() {
  let sidebar = useSelector(state=>state.appstate.sidebar)
  let CartItemEditor = useSelector(state=>state.appstate.editCartItem)
  let redirector = useRef()
  let currentProduct = useSelector(state=>state.appstate.currentProduct)
  useEffect(()=>{
    if (currentProduct !== null) {
      redirector.current.click();
    }
  }, [currentProduct])

  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Link ref={redirector} to="/products/product"></Link>
      <MainComponent/>
      <SideBar/>
      {
        sidebar && <Shadow/>
      }
      {
        CartItemEditor.status && <EditCartItem/>
      }
      </Router>
      </div>
  );
}

export default App;