import React, { Fragment } from "react";
import "./home.css";
import productImg1 from "../Assets/1.webp";
import productImg2 from "../Assets/2.jpg";
import productImg3 from "../Assets/3.webp";
import productImg4 from "../Assets/4.avif";
import { Carousel } from "antd";
import 'antd/dist/reset.css';


const Home = () => {
  return (
    <Fragment>
      <div className="homecontainer">
        <div className="right-box">
          <img src={productImg4} alt="" />
          <div className="text">
            <h1>Create Your Individuality</h1> <br />
            <p>Discover new styles and trends</p>
          </div>
        </div>

        <div className="left-box">
          <div className="top">
            <Carousel  autoplay>
              <div>
                <img src={productImg2}  alt="" />
              </div>
              <div>
                <img src={productImg2} alt="" />
              </div>
              <div>
                <img src={productImg2}  alt="" />
              </div>
              <div>
                <img src={productImg2}  alt="" />
              </div>
            </Carousel>
          </div>
          <div className="bottom">
            <div className="bottom-left-box">
              <img src={productImg1} alt="" />
            </div>
            <div className="bottom-right-box">
              <img src={productImg3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
