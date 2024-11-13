import React, { Fragment } from 'react'
import Home from './components/home/Home'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Buyercontrol from './components/Buyercontrolpage/Buyercontrol'
import Sellercontrol from './components/Sellercontrolpage/Sellercontrol'
import Editsellerdata from './components/Edit/Editsellerdata'
import Editbuyerdata from './components/Edit/Editbuyerdata'
import "./App.css"
import Form from "./components/Form/Form"


const App = () => {
  return (
   <Fragment>
     <BrowserRouter>
            <Routes>
                  <Route path='/' element={<Home />}></Route>    
                    <Route path='/addproduct' element={<Form/>}></Route>    
            </Routes>   
      </BrowserRouter>
   
   </Fragment>
  )
}

export default App