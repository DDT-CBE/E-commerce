import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import Edit from './Editbuyer';
import Search from './Search';
import { useSearchParams } from 'react-router-dom';
import Nav2 from '../Nav2/Nav2';

const APIURL = process.env.REACT_APP_API_URL;

const Editbuyerdata = () => {
  const [buyerdata, setBuyerData] = useState([]);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages

  // Fetch buyer data
  const getBuyerData = () => {
    axios.get(`${APIURL}getnewhouses?` + searchparams.toString())
      .then(res => {
        if (res.data.length === 0) {
          setErr("No user found"); // Set the message if no users are found
        } else {
          setErr(null); // Clear error if data is found
          setBuyerData(res.data);
        }
      })
      .catch(err => setErr(err.response.data.message || "An error occurred"));
  };

  // Delete buyer data
  const deleteHandler = (id) => {
    axios.delete(`${APIURL}deletenewhouses/${id}`)
      .then(result => {
        console.log(result);
        // Remove buyer from state after deletion
        setBuyerData(prevData => prevData.filter(buyer => buyer._id !== id));
      })
      .catch(err => console.log(err));
  };

  // Fetch data on component mount and when searchparams change
  useEffect(() => {
    getBuyerData();
  }, [searchparams]);

  return (
    <Fragment>
     <Nav2/>
   

      <center><h1  className='heading'>Admin Panel - Editing Page</h1></center>

      <h1 className="buyer-title">New Houses </h1>

      {/* Display error or "No user found" */}
      {err ? (
        <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
          <h2>{err}</h2>
        </div>
      ) : (
        <div className="buyer-container">
          {buyerdata.map((data, index) => (
            <div className="buyer-card" key={index}>
                <div className="buyer-field">Project Name: {data.projectName}</div>
              <div className="buyer-field">Title: {data.title}</div>
              <div className="buyer-field">Sale Type: {data.saleType}</div>
              <div className="buyer-field">Society: {data.society}</div>
              <div className="buyer-field">Status: {data.status.dtcp&& data.status.rera ?"Both RERA AND DTCP":data.status.dtcp ? "DTCP" : data.status.rera ?"RERA":""}</div>
              <div className="buyer-field">Construction Status: {data.constructionStatus}</div>
              <div className="buyer-field">House Type: {data.houseType}</div>
              <div className="buyer-field">Budget: {data.budget}</div>
              <div className="buyer-field">Build Up Area: {data.buildUpArea}</div>
              <div className="buyer-field">Carpet Area: {data.carpetArea}</div>
              <div className="buyer-field">Total Floors: {data.totalFloors}</div>
              <div className="buyer-field">Bedrooms: {data.bedrooms}</div>
              <div className="buyer-field">Bathrooms: {data.bathrooms}</div>
              <div className="buyer-field">Balcony: {data.balcony}</div>
              <div className="buyer-field">Furnishing: {data.furnishing}</div>
              <div className="buyer-field">Car Parking: {data.carParking}</div>
              <div className="buyer-field">Facing: {data.facing}</div>
              <div className="buyer-field">Description: {data.description}</div>
              <Edit data={data} />
              <button className='delete' onClick={() => deleteHandler(data._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Editbuyerdata;
