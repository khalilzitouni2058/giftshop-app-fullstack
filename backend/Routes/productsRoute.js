const express = require("express");
const productsRoute = express.Router();
const {
    getProductsByCategory,
    postProduct,
    deleteProduct,
    
} = require("../Controllers/productsController");

productsRoute.get("/products/:category", getProductsByCategory);
productsRoute.post("/products", postProduct);
productsRoute.delete("/products/:title",deleteProduct)



module.exports = productsRoute;