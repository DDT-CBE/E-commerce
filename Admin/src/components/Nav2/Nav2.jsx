import React, { Fragment, useState } from 'react';
import { Link ,useLocation} from 'react-router-dom';
import hamburger from "../Assets/icons8-hamburger-menu-100.png";
import "./nav.css"

const Nav2 = () => {
  const [menu, setMenu] = useState(false);

  // Use the location hook to get the current route
  const location = useLocation();

  const menutoggle = () => {
    setMenu(!menu);
  };

  // Determine whether the current page is buyer or seller based on the URL path
  const isPropertiesPage = location.pathname.includes('properties');
  const isNewhousePage = location.pathname.includes('newhouses');
  // const isFranchisePage = location.pathname.includes('franchise');
  // const isBuyerFormPage = location.pathname.includes('form/buyer');
  // const isSellerFormePage = location.pathname.includes('form/seller');
  

  return (
    <Fragment>
      <nav className='navcontainer'>
        <img className='hamburger' src={hamburger} alt="" onClick={menutoggle} />
        <h1>Real Estate Web Portal <br /> Houses & Property</h1>
        <ul className={menu ? 'reset' : 'navcontent'}>
          <li><Link to={"/"} style={{ color: "#03045e", textDecoration: "none" }}>Home</Link></li>

          {/* Conditionally render the form link based on the page */}
          

          <li>{isPropertiesPage ? <Link to={"/form/properties"} style={{ color: "black", textDecoration: "none" }}>Properties</Link> :""} </li>
          <li>{isNewhousePage ? <Link to={"/form/newhouses"} style={{ color: "black", textDecoration: "none" }}>New Houses</Link> :"" }</li>

      

        </ul>
      </nav>
    </Fragment>
  );
};

export default Nav2;
