import axios from "axios";
import React, { Fragment, useState } from "react";
import "./form.css";
import Nav2 from "../Nav2/Nav2";
import app from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const url = process.env.REACT_APP_API_URL;

const Form = () => {
  // Basic Product Information
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productID, setProductID] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");

  // Product Variations
  const [variations, setVariations] = useState({
    size: "",
    color: "",
    material: "",
    style: "",
  });

  // Media and Content
  const [productImages, setProductImages] = useState([]);
  const [productSpecifications, setProductSpecifications] = useState("");
  const [productFeatures, setProductFeatures] = useState("");

  // Shipping and Delivery
  const [shippingDetails, setShippingDetails] = useState({
    deliveryTime: "",
    shippingCost: "",
    freeShipping: false,
    estimatedDeliveryDate: "",
  });

  // Additional Information
  const [warrantyInfo, setWarrantyInfo] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [customerSupportInfo, setCustomerSupportInfo] = useState("");

  // Other State Variables
  const [approve] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);

  const formData = {
    productName,
    productDescription,
    productID,
    brand,
    modelNumber,
    productType,
    category,
    subcategory,
    price,
    variations,
    productImages,
    productSpecifications,
    productFeatures,
    shippingDetails,
    warrantyInfo,
    returnPolicy,
    customerSupportInfo,
    approve,
  };

  const handleImageUpload = async (e) => {
    const images = e.target.files;
    if (images.length > 0) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const downloadUrls = [];
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const storageRef = ref(storage, `${productName}/` + image.name);
          await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(storageRef);
          downloadUrls.push(downloadUrl);
        }
        setProductImages(downloadUrls);
        setUploading(false);
      } catch (error) {
        console.log(error.message);
        setUploading(false);
      }
    } else {
      console.log("Upload error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${url}newproductregister`, formData)
      .then((res) => {
        console.log(res);
        setSubmit(!submit);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <div className="form-container">
        <Nav2 />
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Register New Product</h2>
          <h3 className="section-heading">Basic Product Information</h3>
          {/* Basic Product Information */}
          <label class="form-label">Product Name</label>
          <input
            type="text"
            className="form-input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />

          <label class="form-label">Product Description</label>
          <textarea
            className="form-input"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />

          <label class="form-label">Product ID</label>
          <input
            type="text"
            className="form-input"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
            placeholder="Enter product ID"
            required
          />

          <label class="form-label">Brand</label>
          <input
            type="text"
            className="form-input"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Enter brand name"
            required
          />

          <label class="form-label">Model Number</label>
          <input
            type="text"
            className="form-input"
            value={modelNumber}
            onChange={(e) => setModelNumber(e.target.value)}
            placeholder="Enter model number"
            required
          />

          <label class="form-label">Product Type</label>
          <input
            type="text"
            className="form-input"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            placeholder="Enter product type"
            required
          />

          <label class="form-label">Category</label>
          <select
            name="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men’s Clothing">Men’s Clothing</option>
            <option value="Women’s Clothing">Women’s Clothing</option>
            <option value="Kids Clothing">Kids Clothing</option>
          </select>

          <label class="form-label">Subcategory</label>
          <select
            name="product-subcategory"
            value={subcategory} // Use a separate state for subcategory
            onChange={(e) => setSubcategory(e.target.value)} // Use setSubcategory for subcategory change
          >
            <optgroup label="Tops">
              <option value="t-shirts">T-Shirts</option>
              <option value="polo-shirts">Polo Shirts</option>
              <option value="dress-shirts">Dress Shirts</option>
              <option value="hoodies-sweatshirts">Hoodies & Sweatshirts</option>
              <option value="jackets-coats">Jackets & Coats</option>
            </optgroup>

            <optgroup label="Bottoms">
              <option value="jeans">Jeans</option>
              <option value="trousers">Trousers</option>
              <option value="shorts">Shorts</option>
              <option value="sweatpants">Sweatpants</option>
            </optgroup>

            <optgroup label="Suits & Formal Wear">
              <option value="blazers">Blazers</option>
              <option value="suits">Suits</option>
              <option value="dress-pants">Dress Pants</option>
              <option value="waistcoats">Waistcoats</option>
            </optgroup>

            <optgroup label="Activewear">
              <option value="sports-t-shirts">Sports T-Shirts</option>
              <option value="track-pants">Track Pants</option>
              <option value="gym-shorts">Gym Shorts</option>
              <option value="compression-wear">Compression Wear</option>
            </optgroup>
          </select>

          <label class="form-label">Price</label>
          <input
            type="number"
            className="form-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />

          {/* Product Variations */}
          <h3 className="section-heading">Product Variations</h3>
          <label class="form-label">Size</label>
          <input
            type="text"
            className="form-input"
            value={variations.size}
            onChange={(e) =>
              setVariations({ ...variations, size: e.target.value })
            }
            placeholder="Enter size"
          />

          <label class="form-label">Color</label>
          <input
            type="text"
            className="form-input"
            value={variations.color}
            onChange={(e) =>
              setVariations({ ...variations, color: e.target.value })
            }
            placeholder="Enter color"
          />

          <label class="form-label">Material</label>
          <input
            type="text"
            className="form-input"
            value={variations.material}
            onChange={(e) =>
              setVariations({ ...variations, material: e.target.value })
            }
            placeholder="Enter material"
          />

          <label class="form-label">Style</label>
          <input
            type="text"
            className="form-input"
            value={variations.style}
            onChange={(e) =>
              setVariations({ ...variations, style: e.target.value })
            }
            placeholder="Enter style"
          />

          {/* Media and Content */}
          <h3 className="section-heading">Media and Content</h3>
          <label class="form-label">Product Image</label>
          <input type="file" multiple onChange={handleImageUpload} />
          <center>
            <p className="uploading-text">
              {uploading ? "Please wait, uploading images..." : ""}
            </p>
          </center>

          <label class="form-label">Product Specifications</label>
          <textarea
            className="form-input"
            value={productSpecifications}
            onChange={(e) => setProductSpecifications(e.target.value)}
            placeholder="Enter product specifications"
          />

          <label class="form-label">Product Features</label>
          <textarea
            className="form-input"
            value={productFeatures}
            onChange={(e) => setProductFeatures(e.target.value)}
            placeholder="Enter product features"
          />

          {/* Shipping and Delivery */}
          <h3 className="section-heading">Shipping and Delivery</h3>
          <label class="form-label">Delivery Time</label>
          <input
            type="text"
            className="form-input"
            value={shippingDetails.deliveryTime}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                deliveryTime: e.target.value,
              })
            }
            placeholder="Enter delivery time"
          />

          <label class="form-label">Shipping Cost</label>
          <input
            type="number"
            className="form-input"
            value={shippingDetails.shippingCost}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                shippingCost: e.target.value,
              })
            }
            placeholder="Enter shipping cost"
          />

          <label class="form-label">Free Shipping</label>
          <input
            type="checkbox"
            checked={shippingDetails.freeShipping}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                freeShipping: e.target.checked,
              })
            }
          />

          <label class="form-label">Estimated Delivery Date</label>
          <input
            type="text"
            className="form-input"
            value={shippingDetails.estimatedDeliveryDate}
            onChange={(e) =>
              setShippingDetails({
                ...shippingDetails,
                estimatedDeliveryDate: e.target.value,
              })
            }
          />

          {/* Additional Information */}
          <h3 className="section-heading">Additional Information</h3>
          <label class="form-label">Warranty Information</label>
          <textarea
            className="form-input"
            value={warrantyInfo}
            onChange={(e) => setWarrantyInfo(e.target.value)}
            placeholder="Enter warranty information"
          />

          <label class="form-label">Return Policy</label>
          <textarea
            className="form-input"
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
            placeholder="Enter return policy"
          />

          <label class="form-label">Customer Support Information</label>
          <textarea
            className="form-input"
            value={customerSupportInfo}
            onChange={(e) => setCustomerSupportInfo(e.target.value)}
            placeholder="Enter customer support information"
          />

          <button type="submit" disabled={loading || submit || uploading}>
            {loading ? "Submitting..." : submit ? "Form Submitted" : "Submit"}
          </button>
          <div className="centered-text">
            {submit ? "Thank you for filling out the form!" : err}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
