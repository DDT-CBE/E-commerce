import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import hamburger from "../Assets/icons8-hamburger-menu-100.png";


const Nav2 = () => {
  const [menu, setMenu] = useState(false);

  // Use the location hook to get the current route


  const menutoggle = () => {
    setMenu(!menu);
  };

  

  return (
    <Fragment>
      <nav className='navcontainer'>
        <img className='hamburger' src={hamburger} alt="" onClick={menutoggle} />
        <h1>Men's Cloths</h1>
        <ul className={menu ? 'reset' : 'navcontent'}>
          <li><Link to={"/"} style={{ color: "#03045e", textDecoration: "none" }}>Home</Link></li>
      
        </ul>
      </nav>
    </Fragment>
  );
};

export default Nav2;
