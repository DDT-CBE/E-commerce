const mongoose = require("mongoose");

const NewProductSchema = new mongoose.Schema({
    // Basic Product Information
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productID: {
        type: String,
        unique: true,
        required: true,
    },
    brand: {
        type: String,
    },
    modelNumber: {
        type: String,
    },
    productType: {
        type: String,
    },
    category: {
        type: String,
    },
    subcategory: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },

    // Product Variations
    variations: {
        size: { type: String },
        color: { type: String },
        material: { type: String },
        style: { type: String }
    },

    // Media and Content
    productImages: {
        type: [String], // Array to store multiple image URLs
    },
    productSpecifications: {
        type: String,
    },
    productFeatures: {
        type: String,
    },

    // Shipping and Delivery
    shippingDetails: {
        deliveryTime: { type: String },
        shippingCost: { type: Number },
        freeShipping: { type: Boolean, default: false },
        estimatedDeliveryDate: { type: String ,default:"Delivery with in 7 days" }
    },

    // Additional Information
    warrantyInfo: {
        type: String,
    },
    returnPolicy: {
        type: String,
    },
    customerSupportInfo: {
        type: String,
    },

    // Approval Status
    approve: {
        type: Boolean,
        default: false, // Default approval status is false
    }
});

const NewProductModel = mongoose.model("NewProduct", NewProductSchema);

module.exports = NewProductModel;
