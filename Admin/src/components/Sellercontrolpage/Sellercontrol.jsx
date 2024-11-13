import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Nav2 from '../Nav2/Nav2';
const APIURL = process.env.REACT_APP_API_URL;

const Sellercontrol = () => {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSellerId, setActiveSellerId] = useState(null); // Track which seller's "More" section is open
  // Fetch user data
  const handleFetch = () => {
    axios
      .get(`${APIURL}getpropertyrequest`)
      .then((res) => {
        console.log(res.data);
       
        setUserData(res.data);
        setLoading(false); // Set loading false once data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        console.log(APIURL);
      });
  };

  // Handle approval of user data
  const approveHandler = (id, currentApproveStatus) => {
    // Toggle the approve status
    const newApproveStatus = !currentApproveStatus;

    // Update the user approval status in the backend
    axios
      .put(`${APIURL}updateproperty/${id}`, { approve: newApproveStatus })
      .then((res) => {
        console.log(res.data);

        // Update the state to reflect the change
        const updatedUsers = userdata.map((user) =>
          user._id === id ? { ...user, approve: newApproveStatus } : user
        );
        setUserData(updatedUsers);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleFetch();
  }, []);


  const toggleBtnMore = (id) => {
    setActiveSellerId(activeSellerId === id ? null : id);
}

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  // Filter to show only users with approve: false
  const filteredUsers = userdata.filter((user) => user.approve === false);

  return (
    <Fragment>


      <Nav2 />

      <center>
        <h1 className='heading'>Admin Panel - Property Pending Approvals</h1>
      </center>

      {filteredUsers.length === 0 ? (
        <center>
          <p>No approvals pending.</p>
        </center>
      ) : (



        <div className="buyer-container">
          {filteredUsers.map((data, index) => (
            <div className="buyer-card" key={index}>
<center><img className='img'  src={data.uploadimage} alt="" /></center>
                    
                    <table className="details-table">
                    <tbody>  
                                    <tr>
                                        <th>State</th>
                                        <td>{data.state}</td>
                                    </tr>
                                    <tr>
                                        <th>District</th>
                                        <td>{data.district}</td>
                                    </tr>
                                    <tr>
                                        <th>Property Type</th>
                                        <td>{data.propertytype}</td>
                                    </tr>
                                    
                                    <tr>
                                        <th>Company Name</th>
                                        <td>{data.companyName}</td>
                                    </tr>

                        </tbody>

                </table>
                        <button className={activeSellerId === data._id ?"morehide":'more'} onClick={() => toggleBtnMore(data._id)}>
                             More
                        </button>

                                  {activeSellerId === data._id && (
                                     <table className="details-table">
                                     <tbody>
                                             <tr>
                                                 <th>About Company</th>
                                                 <td>{data.aboutCompany}</td>
                                             </tr>
                                             <tr>
                                                 <th>Property Name</th>
                                                 <td>{data.propertyName}</td>
                                             </tr>
                                             <tr>
                                                 <th>Property Details</th>
                                                 <td>{data.propertyDetails}</td>
                                             </tr>
                                             <tr>
                                                 <th>Features</th>
                                                 <td>{data.features}</td>
                                             </tr>
                                             <tr>
                                                 <th>Amenities</th>
                                                 <td>{data.amenities}</td>
                                             </tr>
                                             <tr>
                                                 <th>No. of Plots</th>
                                                 <td>{data.noOfPlots}</td>
                                             </tr>
                                             <tr>
                                                 <th>Plot Size (Min sq.ft)</th>
                                                 <td>{data.plotSizeMin}</td>
                                             </tr>
                                             <tr>
                                                 <th>Plot Size (Max sq.ft)</th>
                                                 <td>{data.plotSizeMax}</td>
                                             </tr>
                                             <tr>
                                                 <th>Location</th>
                                                 <td>{data.location}</td>
                                             </tr>
                                             <tr>
                                                 <th>Nearby Spots</th>
                                                 <td>{data.nearbySpots}</td>
                                             </tr>
                                             <tr>
                                                 <th>Status Approvel</th>
                                                 <td>{data.status.dtcp&&data.status.rera ? "DTCP AND RERA " :data.status.dtcp ? "DTCP" :data.status.rera? "RERA Facing" :""}</td>
                                             </tr>
                                             <tr>
                                                 <th>Legalities</th>
                                                 <td>{data.legalities}</td>
                                             </tr>
                                             <tr>
                                                 <th>Address</th>
                                                 <td>{data.address}</td>
                                             </tr>
                                             <tr>
                                                 <th>Place</th>
                                                 <td>{data.place}</td>
                                             </tr>
                                             <tr>
                                                 <th>Google Map</th>
                                                 <td>{data.googleMap}</td>
                                             </tr>
                                             <tr>
                                                 <th>Launch Date</th>
                                                 <td>{data.launchDate}</td>
                                             </tr>
                                             <tr>
                                                 <th>Plot Price (sq.ft)</th>
                                                 <td>{data.plotPrice}</td>
                                             </tr>
                                 <tr>
                                 <th>Closed Plots / Remaining Plot</th>
                                       <td>
                                         1
                                         <input type="checkbox" checked={data.plot.one} />
                                         2
                                         <input type="checkbox" checked={data.plot.two} />
                                         3
                                         <input type="checkbox" checked={data.plot.three} />
                                         4
                                         <input type="checkbox" checked={data.plot.four} />
                                         5
                                         <input type="checkbox" checked={data.plot.five} />
                                         6
                                         <input type="checkbox" checked={data.plot.six} />
                                         7
                                         <input type="checkbox" checked={data.plot.seven} />
                                         8
                                         <input type="checkbox" checked={data.plot.eight} />
                                         9
                                         <input type="checkbox" checked={data.plot.nine} />
                                         10
                                         <input type="checkbox" checked={data.plot.ten} />
                                       </td>
                                 </tr>
         
                                     
         
                                 
                             </tbody>
                         </table>
                                )} 
                              

      


              <button className="approve-button" onClick={() => approveHandler(data._id, data.approve)}>
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Sellercontrol;
