import React, { Fragment, useEffect, useState } from 'react'
import {ToastContainer}from "react-toastify"
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';

import About from './Components/About/About';
import Enquiry from './Components/Enquiry/Enquiry';
import Contact from './Components/Contact/Contact';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Buyerpage from './Components/Buyerpage/Buyerpage';
import 'react-toastify/dist/ReactToastify.css';
import Product from './Components/Product/Product';



const App = () => {

  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 3000);
  }, []);

  if (loading) {
    return <div className='loader'></div>; 
  }

  return (


  <BrowserRouter>
  
  
    <Routes>
    
          <Route path='/' element={
                  <Fragment>
                  <Nav />
                  <Home />
                  <Buyerpage/>  
                  {/* <About/>
                  <Enquiry />
                  <Contact /> */}
                
                  </Fragment>  }>
          </Route>
        
        
          <Route path='products/:id' element={<Product />}></Route>
          <Route path='/products' element={ <Buyerpage/>  }></Route>
  
    </Routes>   
    <ToastContainer />
</BrowserRouter>

   
  )
}

export default App