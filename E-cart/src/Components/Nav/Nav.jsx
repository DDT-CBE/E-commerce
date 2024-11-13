import React, { Fragment, useState } from "react";
import "./nav.css";
import hamburger from "../Assets/icons8-hamburger-menu-100.png";
import { Link as ScrollLink } from "react-scroll";

const Nav = () => {
  const [menu, setMenu] = useState(false);

  const menutoggle = () => {
    setMenu(!menu);
  };

  return (
    <Fragment>
      <nav className="navcontainer">
        <img
          className="hamburger"
          src={hamburger}
          alt=""
          onClick={menutoggle}
        />
        <h1>
        Men's Clothes
        </h1>
        <ul className={menu ? "reset" : "navcontent"}>
          <li>
            <ScrollLink
              to="homecontainer"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Home
            </ScrollLink>
          </li>

          <li>Sweaters</li>
          <li>Jeans</li>
          <li>Coats & Jackets</li>
          <li>Accessories</li>
          <li>Suits</li>
          <li>Profile</li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Nav;
