import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import './buyerpage.css'; // Import your CSS file
import Nav2 from '../Nav2/Nav2';
import { Link, useSearchParams } from 'react-router-dom';
import Search from '../Search/Search';
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
                <div className="product-container">
                    {productData.length === 0 ? (
                        <p>No products available at the moment.</p> // Additional message if the products are empty
                    ) : (
                        productData.map((product) => (
                            <div className="product-card" key={product._id}>
                                <div className="image-container">
                                    <img className="product-image" src={product.productImages[0]} alt={product.productName} />
                                </div>
                                <div className="product-info">
                                    <h2 className="product-name">{product.productName}</h2>
                                    <p className="product-description">{product.productDescription}</p>
                                    <p className="product-price">${product.price}</p>
                                    <Link to={`product/${product._id}`}>
                                        <button className="view-more">View Details</button>
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
