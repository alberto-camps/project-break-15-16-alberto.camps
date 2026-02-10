/**
 * Product.js
 * Modelo de datos de productos
 */

const mongoose = require("mongoose");
const validCategories = ["Camisetas", "Pantalones", "Zapatos", "Accesorios"]
const validSizes = ["XS", "S", "M", "L", "XL"]

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    description: {
        type: String, 
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: validCategories, 
        required: true,
        trim: true
    },
    size: {
        type: String,
        enum: validSizes,
        required: true,
        trim: true 
    },
    price: {
        type: Number, 
        required: true,
        min: 0
    }

},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema);