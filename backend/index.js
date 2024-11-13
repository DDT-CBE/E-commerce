const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const NewHouseModel = require("./Model/NewProductModel");
const path = require("path");
const NewProductModel = require("./Model/NewProductModel");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.dburl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));




app.post("/newproductregister", async (req, res) => {
  try {
    const newProduct = await NewProductModel.create(req.body);  // Create a new user in the database
    res.status(201).json(newProduct);  // Respond with the created user
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


  app.put('/updateproperty/:id', (req, res) => {
    const { id } = req.params;
    const { approve } = req.body;
  
    PropertyModel.findByIdAndUpdate(id, { approve}, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }));
  });

  app.put('/updatenewhouses/:id', (req, res) => {
    const { id } = req.params;
    const { approve } = req.body;
  
    NewHouseModel.findByIdAndUpdate(id, { approve}, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ error: err.message }));
  });

  app.delete("/deleteproperty/:id", async (req, res) => {
    const {id } = req.params
    try {
      const removeUser = await PropertyModel.findByIdAndDelete(id);  
      res.status(201).json(removeUser);  
    } catch (error) {
      console.error("Signup error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.delete("/deletenewhouses/:id", async (req, res) => {
    const {id } = req.params
    try {
      const removeUser = await NewHouseModel.findByIdAndDelete(id);  
      res.status(201).json(removeUser);  
    } catch (error) {
      console.error("Signup error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  app.get("/getproducts", async (req, res) => {
    try {
      const query = {
        approve: false // Ensure only approved users are fetched
    };
     // Add filters for name and/or state if provided
     if (req.query.industry) {
      query.industry = {
          $regex: req.query.industry,  // Search for partial matches
          $options: "i"  // Case-insensitive search
      };
  }
  if (req.query.category) {
    query.category = {
        $regex: req.query.category,  // Search for partial matches
        $options: "i"  // Case-insensitive search
    };
}
if (req.query.district) {
  query.district = {
      $regex: req.query.district,  // Search for partial matches
      $options: "i"  // Case-insensitive search
  };
}
  if (req.query.state) {
      query.state = {
          $regex: req.query.state,  // Search for partial matches
          $options: "i"  // Case-insensitive search
      };
  }
      const getProduct = await NewProductModel.find(query);
      res.json(getProduct); // Send the retrieved users as JSON response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
    }
  });


  
  

  app.get("/getpropertyrequest", async (req, res) => {
    try {
   
      const getUser = await PropertyModel.find({approve : false});
      res.json(getUser); // Send the retrieved users as JSON response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
    }
  });

  
  app.get("/getnewhouserequest", async (req, res) => {
    try {
   
      const getUser = await NewHouseModel.find({approve : false});
      res.json(getUser); // Send the retrieved users as JSON response
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
    }
  });

  
  app.get("/getsingleproduct/:id", async (req, res) => {
    const { id } = req.params; // Get the id from the request params
    try {
        const getUser = await NewProductModel.findById(id); // Pass the id directly to findById
        if (!getUser) {
            return res.status(404).json({ error: "House not found" }); // Handle case where house is not found
        }
        res.json(getUser); // Send the retrieved house as JSON response
       
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" }); // Handle error and send a response
    }
});

  
app.get("/getsingleproperty/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the request params
  try {
      const getUser = await PropertyModel.findById(id); // Pass the id directly to findById
      if (!getUser) {
          return res.status(404).json({ error: "House not found" }); // Handle case where house is not found
      }
      res.json(getUser); // Send the retrieved house as JSON response
    
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" }); // Handle error and send a response
  }
});



  app.put('/editproperty/:id', (req, res) => {
  const { id } = req.params;
  const  updateproperty = req.body;

  PropertyModel.findByIdAndUpdate(id, updateproperty, { new: true })
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/editnewhouses/:id', (req, res) => {
  const { id } = req.params;
  const  updatenewhouse = req.body;

  NewHouseModel.findByIdAndUpdate(id, updatenewhouse, { new: true })
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(500).json({ error: err.message }));
});


  


// Serve frontend
app.use(express.static(path.join(__dirname, "../E-cart/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../E-cart/build/index.html"));
});


// Start the server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
