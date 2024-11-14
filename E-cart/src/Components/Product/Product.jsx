import React, { Fragment, useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav2 from "../Nav2/Nav2";
import { Image } from "antd";

const url = process.env.REACT_APP_API_URL;

const Product = () => {
  const [details, setDetails] = useState(null);
  const [err, setErr] = useState(null);
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [img, setImg] = useState(null);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`${url}getsingleproduct/${id}`);
      setDetails(res.data);
      setImg(res.data.productImages[0]); // Set initial image once details are fetched
    } catch (error) {
      setErr("Single product fetching Error: " + error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  const incrementIndex = () => {
    if (details) {
      setIndex((prevIndex) => (prevIndex + 1) % details.productImages.length);
      setImg(details.productImages[(index + 1) % details.productImages.length]);
    }
  };

  const decrementIndex = () => {
    if (details) {
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + details.productImages.length) %
          details.productImages.length
      );
      setImg(
        details.productImages[
          (index - 1 + details.productImages.length) %
            details.productImages.length
        ]
      );
    }
  };

  const handleBuyNow = () => {
    if (details) {
      const phoneNumber = "+919994587405"; // Replace with the actual phone number, including country code.
      const message = encodeURIComponent(
        `Hello, I'm interested in buying ${details.productName} for ₹${details.price}.`
      );
  
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappURL, "_blank");
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
          <div className="product-container">
            <>
              <div className="product-thumbnails">
                {details.productImages.map((image, i) => (
                  <img
                    key={i}
                    className={`thumbnail-image ${
                      img === image ? "selected-thumbnail" : ""
                    }`}
                    src={image}
                    alt=""
                    onMouseOver={() => setImg(image)}
                  />
                ))}
              </div>
              <div className="product-main-image">
                <button onClick={incrementIndex} className="next-arrow">
                  &gt;
                </button>
                <button onClick={decrementIndex} className="prev-arrow">
                  &lt;
                </button>
                <Image className="main-image" src={img} alt="Product" />
              </div>
            </>
            <div className="productcard" key={details._id}>
              <div className="product-info">
                <h1 className="product-title">{details.productName}</h1>
                <h3 className="product-brand">{details.brand}</h3>
                <p className="product-description">
                  {details.productDescription}
                </p>

                <div className="product-details-grid">
                  <div className="detail-item">
                    <strong>Model Number:</strong> {details.modelNumber}
                  </div>
                  <div className="detail-item">
                    <strong>Price:</strong>{" "}
                    <span className="product-price">₹{details.price}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Size:</strong> {details.variations.size}
                  </div>
                  <div className="detail-item">
                    <strong>Color:</strong> {details.variations.color}
                  </div>
                  <div className="detail-item">
                    <strong>Material:</strong> {details.variations.material}
                  </div>
                  <div className="detail-item">
                    <strong>Style:</strong> {details.variations.style}
                  </div>
                  <div className="detail-item">
                    <strong>Shipping Cost:</strong> ₹
                    {details.shippingDetails.shippingCost}
                  </div>
                  <div className="detail-item">
                    <strong>Product Specifications:</strong>{" "}
                    {details.warrantyInfo}
                  </div>
                  <div className="detail-item">
                    <strong>Product Features:</strong> {details.returnPolicy}
                  </div>
                  <div className="detail-item">
                    <strong>Customer Support Info:</strong>{" "}
                    {details.customerSupportInfo}
                  </div>
                </div>

                <div className="product-actions">
                  <button className="buy-now-btn" onClick={handleBuyNow}>
                    Buy Now
                  </button>
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
