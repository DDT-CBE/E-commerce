import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import './buyerpage.css';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Result } from 'antd';

const url = process.env.REACT_APP_API_URL;

const Buyerpage = () => {
    const [productData, setProductData] = useState([]);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(''); // State to store selected category

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${url}getproducts?` + searchparams.toString());
                if (res.data.length === 0) {
                    setErr("No products found");
                } else {
                    setErr(null);
                    setProductData(res.data);
                }
            } catch (err) {
                console.log(err);
                setErr("Server Error");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchparams]);

    const handleBuyNow = (product) => {
        if (product) {
            const phoneNumber = "+919994587405";
            const message = encodeURIComponent(
                `Hello, I'm interested in buying *${product.productName}*, \n\n *Model Number: ${product.modelNumber}*,\n\nProduct Link: https://e-commerce-k3k2.onrender.com/products/${product._id}`
            );
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappURL, "_blank");
        }
    };
    

    // Filter product data based on selected category
    const filteredProducts = category ? productData.filter((product) =>   product.category.toLowerCase().includes(category.toLowerCase())  ) : productData;

    if (loading) {
        return <div className="loader"></div>;
    }

    return (
        <Fragment>
            <h1 className="page-title">New Arrivals</h1>

            {/* Category Filter Buttons */}
            <div className="category-buttons">
                <button onClick={() => setCategory('Male')}>Men</button>
                <button onClick={() => setCategory('Women')}>Women</button>
                <button onClick={() => setCategory('Kids')}>Kids</button>
                <button onClick={() => setCategory('')}>All</button> {/* Show all products */}
            </div>

            {err ? (
                <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong."
                    extra={<Button type="primary" href='/'>Back Home</Button>}
                />
            ) : (
                <div className="products-container">
                    {filteredProducts.length === 0 ? (
                        <p>No products available at the moment.</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <div className="products-card" key={product._id}>
                                <div className="image-container">
                                    <img
                                        className="products-image"
                                        src={product.productImages[0]}
                                        alt={product.productName}
                                    />
                                </div>
                                <div className="products-info">
                                    <h2 className="products-name">{product.productName}</h2>
                                    <p className="products-price">₹{product.price}</p>
                                    <Link to={`products/${product._id}`}>
                                        <button className="view-more">View Details</button>
                                    </Link>
                                    <button
                                        className="view-more"
                                        onClick={() => handleBuyNow(product)}
                                    >
                                        Enquiry
                                    </button>
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
