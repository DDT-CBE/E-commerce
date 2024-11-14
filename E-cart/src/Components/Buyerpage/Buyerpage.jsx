import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import './buyerpage.css'; // Import your CSS file
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Result } from 'antd';

const url = process.env.REACT_APP_API_URL;

const Buyerpage = () => {
    const [productData, setProductData] = useState([]);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Set loading state to true when starting to fetch data
                const res = await axios.get(`${url}getproducts?` + searchparams.toString());
                if (res.data.length === 0) {
                    setErr("No products found"); // Set the message if no products are found
                } else {
                    setErr(null); // Clear error if products are found
                    setProductData(res.data); // Store all products
                }
            } catch (err) {
                console.log(err);
                setErr("Server Error"); // Set the message if there is a server error
            } finally {
                setLoading(false); // Set loading false once data is fetched (whether success or error)
            }
        };
        fetchProducts();
    }, [searchparams]);

   
    const handleBuyNow = () => {

        if(product){
            const phoneNumber = "+919994587405"; // Replace with the actual phone number, including country code if necessary.
            const message = encodeURIComponent(
              `Hello, I'm interested in buying *${product.productName}* for *₹${product.price}*.`
            );
        
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        
            window.open(whatsappURL, "_blank");
        }
  
      };

      if (loading) {
        return <div className='loader'></div>; // Show loading indicator while data is being fetched
    }

    return (
        <Fragment>
            
            <h1 className="page-title">New Arrivals</h1>
            

            {err ? (
                <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong." 
                    extra={<Button type="primary" href='/'>Back Home</Button>}
                />
            ) : (
                <div className="products-container">
                    {productData.length === 0 ? (
                        <p>No products available at the moment.</p> // Additional message if the products are empty
                    ) : (
                        productData.map((product) => (
                            <div className="products-card" key={product._id}>
                                <div className="image-container">
                                    <img className="products-image" src={product.productImages[0]} alt={product.productName} />
                                </div>
                                <div className="products-info">
                                    <h2 className="products-name">{product.productName}</h2>
                                
                                    <p className="products-price">${product.price}</p>
                                    <Link to={`products/${product._id}`}>
                                        <button className="view-more">View Details</button>
                                    </Link>
                                    <Link to={`products/${product._id}`}>
                                        <button className="view-more" onClick={()=>handleBuyNow(product)}>Enquiry</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default Buyerpage;
