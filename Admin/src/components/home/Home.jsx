import React from "react";
import "./home.css"; // Import your CSS file

const Home = () => {
  return (
    <div className="home-container">
      
    
      
      
      {/* <a href="/buyer"><div  className="approval-section buyer-approval">House Approval</div></a>
      <a href="/seller"><div className="approval-section seller-approval">  Property Approval</div></a>
      <a href="/buyeredit"><div className="edit-section buyer-edit">House Edit</div></a>
      <a href="/selleredit"><div className="edit-section seller-edit">Property Edit</div></a> */}
      <a href="/addproduct"><div className="edit-section seller-edit">Add Products</div></a>
     
    </div>
  );
};

export default Home;
