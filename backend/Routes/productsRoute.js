const express = require("express");
const productsRoute = express.Router();
const {
    getProductsByCategory,
    postProduct,
    deleteProduct,
    getProductById,
    getProduct,
    getProducts
    
} = require("../Controllers/productsController");
const isAuth = require("../middleware/isAuth")
const isAutho=require('../middleware/isAutho')


productsRoute.get("/products/:category", getProductsByCategory);
productsRoute.get("/products",getProduct)
productsRoute.get("/products/:category/:id", getProductById);
productsRoute.post("/products", postProduct);
productsRoute.delete("/products/:id",deleteProduct)
productsRoute.get("/allproducts",getProducts);



module.exports = productsRoute;