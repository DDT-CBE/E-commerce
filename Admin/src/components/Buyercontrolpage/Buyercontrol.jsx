import axios from 'axios';
import React, { Fragment ,useEffect,useState} from 'react'
import "./buyercontrol.css";
import Nav2 from '../Nav2/Nav2';
const APIURL = process.env.REACT_APP_API_URL;

const Buyercontrol = () => {

    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [activeBuyerId, setActiveBuyerId] = useState(null); // State to track which buyer's "More" section is open

      // Fetch user data
  const handleFetch = () => {
    axios.get(`${APIURL}getnewhouserequest`)
      .then(res => {
        console.log(res.data);
        setUserData(res.data);
        setLoading(false); // Set loading false once data is fetched
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  


    // Handle approval of user data
    const approveHandler = (id, currentApproveStatus) => {
        // Toggle the approve status
        const newApproveStatus = !currentApproveStatus;
    
        // Update the user approval status in the backend
        axios.put(`${APIURL}updatenewhouses/${id}`, { approve: newApproveStatus })
          .then(res => {
            console.log(res.data);
    
            // Update the state to reflect the change
            const updatedUsers = userdata.map(user => 
              user._id === id ? { ...user, approve: newApproveStatus } : user
            );
            setUserData(updatedUsers);
          })
          .catch(err => console.log(err));
      };




      useEffect(() => {
        handleFetch();
      }, []);

      const toggleBtnMore = (buyerId) => {
        // Toggle the activeBuyerId; if the same ID is clicked again, close it
        setActiveBuyerId(activeBuyerId === buyerId ? null : buyerId);
    };


      if (loading) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
      }

      // Filter to show only users with approve: false
  const filteredUsers = userdata.filter(user => user.approve === false);
  return (
    <Fragment>
    <Nav2 />

      
         <center><h1 className='heading'>Admin Panel - House Pending Approvals</h1></center> 
{filteredUsers.length === 0 ? (
  <center>
  <p>No approvals pending.</p>
</center>
) :(
  <div className="buyer-container">
        {filteredUsers.map((data, index) => (
         

    <div className="buyer-card" key={data._id}>
    <div className="image-container">
   
    <center>
        <img className="img" src={data.uploadimage[0]} alt="" />
    </center>
   
</div>

                      <table className="details-table">  
                        <tbody>  
                          <tr>
                            <th>Project Name</th>
                            <td>{data.projectName}</td>
                          </tr>
                          <tr>
                            <th>Title</th>
                            <td>{data.title}</td>
                          </tr>
                          <tr>
                            <th>Sale Type</th>
                            <td>{data.saleType}</td>
                          </tr>
                          <tr>
                            <th>Society</th>
                            <td>{data.society}</td>
                          </tr>
                          </tbody>
                          </table>

                          <button className={activeBuyerId === data._id ?"morehide":'more'} onClick={() => toggleBtnMore(data._id)}>
                             More
                          </button>

                          {activeBuyerId === data._id && (
                          <table className="details-table">
                          <tbody>
                          <tr>
                            <th>Approved Status</th>
                            <td> {data.status.rera && data.status.dtcp? "DTCP AND RERA" : data.status.dtcp ? 'DTCP' : data.status.rera ? 'RERA':" NO DTCP AND RERA"}</td>
                          </tr>
                          <tr>
                            <th>Construction Status</th>
                            <td>{data.constructionStatus}</td>
                          </tr>
                          <tr>
                            <th>House Type</th>
                            <td>{data.houseType}</td>
                          </tr>
                          <tr>
                            <th>Budget</th>
                            <td>{data.budget}</td>
                          </tr>
                          <tr>
                            <th>Build Up Area</th>
                            <td>{data.buildUpArea}</td>
                          </tr>
                          <tr>
                            <th>Carpet Area</th>
                            <td>{data.carpetArea}</td>
                          </tr>
                          <tr>
                            <th>Total Floors</th>
                            <td>{data.totalFloors}</td>
                          </tr>
                          <tr>
                            <th>Bedrooms</th>
                            <td>{data.bedrooms}</td>
                          </tr>
                          <tr>
                            <th>Bathrooms</th>
                            <td>{data.bathrooms}</td>
                          </tr>
                          <tr>
                            <th>Balcony</th>
                            <td>{data.balcony}</td>
                          </tr>
                          <tr>
                            <th>Furnishing</th>
                            <td>{data.furnishing}</td>
                          </tr>
                          <tr>
                            <th>Car Parking</th>
                            <td>{data.carParking}</td>
                          </tr>
                          <tr>
                            <th>Facing</th>
                            <td>{data.facing}</td>
                          </tr>
                          <tr>
                            <th>Description</th>
                            <td>{data.description}</td>
                          </tr>
                          <tr>
                            <th>Approved</th>
                            <td>{data.approve ? 'Yes' : 'No'}</td>
                          </tr>
                        </tbody>
                      </table>)}
                         

                    
                  

    
            <button 
              className="approve-button" 
              onClick={() => approveHandler(data._id, data.approve)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
)}
         
    </Fragment>
  )
}

export default Buyercontrol