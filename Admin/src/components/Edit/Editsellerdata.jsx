
import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import Edit from './Editseller';
import Search from './Search';
import { useSearchParams } from 'react-router-dom';
import Nav2 from '../Nav2/Nav2';

const APIURL = process.env.REACT_APP_API_URL;


const Editsellerdata = () => {

    const [buyerdata, setBuyerData] = useState([]);
    const [searchparams ] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages

// Fetch buyer data
const getSellerdata = () => {
  axios.get(`${APIURL}getproperty?`+searchparams)
    .then(res => {
      if (res.data.length === 0) {
        setErr("No user found"); // Set the message if no users are found
      }else{
        console.log(res.data);
        setBuyerData(res.data);
      }
    })
    .catch(err => setErr(err.response.data.message || "An error occurred"));
};

// Delete buyer data
const deleteHandler = (id) => {
  axios.delete(`${APIURL}deleteproperty/${id}`)
    .then(result => {
      console.log(result);
      // Remove buyer from state after deletion
      setBuyerData(prevData => prevData.filter(buyer => buyer._id !== id));
    })
    .catch(err => console.log(err));
};

// Only fetch data once on component mount
useEffect(() => {
  getSellerdata();
}, [searchparams]); // Empty dependency array ensures it runs only once



  return (
    <Fragment>
     <Nav2 />
     
    
     
    <center ><h1 className='heading'>Admin Panel - Editing Page</h1></center> 
   

    <h1 className="buyer-title">Property </h1>
    {err ? (
        <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
          <h2>{err}</h2>
        </div>
      ) : (
    <div className="buyer-container">
      {buyerdata.map((data, index) => (
    <div className="buyer-card" key={index}>
    <div className="buyer-state">State: {data.state}</div>
    <div className="buyer-district">District: {data.district}</div>
    <div className="buyer-propertytype">Property Type: {data.propertytype}</div>
    <div className="buyer-propertyid">Property ID: {data.propertyId}</div>
    <div className="buyer-companyname">Company Name: {data.companyName}</div>
    <div className="buyer-aboutcompany">About Company: {data.aboutCompany}</div>
    <div className="buyer-propertyname">Property Name: {data.propertyName}</div>
    <div className="buyer-propertydetails">Property Details: {data.propertyDetails}</div>
    <div className="buyer-features">Features: {data.features}</div>
    <div className="buyer-amenities">Amenities: {data.amenities}</div>
    <div className="buyer-noofplots">Number of Plots: {data.noOfPlots}</div>
    <div className="buyer-plotsize-min">Plot Size Min: {data.plotSizeMin}</div>
    <div className="buyer-plotsize-max">Plot Size Max: {data.plotSizeMax}</div>
    <div className="buyer-location">Location: {data.location}</div>
    <div className="buyer-nearbyspots">Nearby Spots: {data.nearbySpots}</div>
    <div className="buyer-legalities">Legalities: {data.legalities}</div>
    <div className="buyer-address">Address: {data.address}</div>
    <div className="buyer-place">Place: {data.place}</div>
    <div className="buyer-googlemap">Google Map: {data.googleMap}</div>
    <div className="buyer-launchdate">Launch Date: {data.launchDate}</div>
    <div className="buyer-plotprice">Plot Price: {data.plotPrice}</div>

    {/* Plots data */}
    <div className="buyer-plots">
      <div>Plot One: {data.plot.one ? "Yes" : "No"}</div>
      <div>Plot Two: {data.plot.two ? "Yes" : "No"}</div>
      <div>Plot Three: {data.plot.three ? "Yes" : "No"}</div>
      <div>Plot Four: {data.plot.four ? "Yes" : "No"}</div>
      <div>Plot Five: {data.plot.five ? "Yes" : "No"}</div>
      <div>Plot Six: {data.plot.six ? "Yes" : "No"}</div>
      <div>Plot Seven: {data.plot.seven ? "Yes" : "No"}</div>
      <div>Plot Eight: {data.plot.eight ? "Yes" : "No"}</div>
      <div>Plot Nine: {data.plot.nine ? "Yes" : "No"}</div>
      <div>Plot Ten: {data.plot.ten ? "Yes" : "No"}</div>
    </div>

    <Edit data={data} />
    <button onClick={() => deleteHandler(data._id)}>Delete</button>
  </div>
))}

    </div>
      )}
  </Fragment>
);
    
}

export default Editsellerdata