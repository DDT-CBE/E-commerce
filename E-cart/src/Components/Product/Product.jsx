import React, { Fragment, useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav2 from "../Nav2/Nav2";
import { Image } from "antd";

const url = process.env.REACT_APP_API_URL;

const Product = () => {
  const [details, setDetails] = useState(null);
  const [count, setCount] = useState(0);
  const [err, setErr] = useState(null);
  const { id } = useParams();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`${url}getsingleproduct/${id}`);
      setDetails(res.data);
    } catch (error) {
      setErr("Single product fetching Error: " + error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  const handleLeftArrowClick = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (count < details.productImages.length - 1) {
      setCount(count + 1);
    }
  };

  if (!details) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Fragment>
      <Nav2 />

      <div className="productcontainer">
        {err ? (
          <div className="errormessage">
            <h2>{err}</h2>
          </div>
        ) : (
          <div className="productcard" key={details._id}>
            <div className="imageslider">
              <button
                className="arrowbtn leftbtn"
                onClick={handleLeftArrowClick}
              >
                &lt;
              </button>
              <div className="productimagewrapper">
                <Image
                  src={details.productImages[count]}
                  alt={details.productName}
                />
              </div>

              <button
                className="arrowbtn rightbtn"
                onClick={handleRightArrowClick}
              >
                &gt;
              </button>
            </div>
            <div className="productinfo">
              <h1 className="producttitle">{details.productName}</h1>
              <h3 className="productbrand">{details.brand}</h3>
              <p className="productdescription">{details.productDescription}</p>
              <div className="detailsgrid">
                <div className="detailitem">
                  <strong>Model Number:</strong> {details.modelNumber}
                </div>
                <div className="detailitem">
                  <strong>Price:</strong> ₹{details.price}
                </div>
                <div className="detailitem">
                  <strong>Size:</strong> {details.variations.size}
                </div>
                <div className="detailitem">
                  <strong>Color:</strong> {details.variations.color}
                </div>
                <div className="detailitem">
                  <strong>Material:</strong> {details.variations.material}
                </div>
                <div className="detailitem">
                  <strong>Style:</strong> {details.variations.style}
                </div>
                <div className="detailitem">
                  <strong>Shipping Cost:</strong> ₹{details.shippingDetails.shippingCost}
                </div>
                <div className="detailitem">
                  <strong>Warranty Info:</strong> {details.warrantyInfo}
                </div>
                <div className="detailitem">
                  <strong>Return Policy:</strong> {details.returnPolicy}
                </div>
                <div className="detailitem">
                  <strong>Customer Support Info:</strong> {details.customerSupportInfo}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Product;
