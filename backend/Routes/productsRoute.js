const express = require("express");
const productsRoute = express.Router();
const {
    getProductsByCategory,
    postProduct,
    deleteProduct,
    getProductById,
    
} = require("../Controllers/productsController");
const isAuth = require("../middleware/isAuth")
const isAutho=require('../middleware/isAutho')


productsRoute.get("/products/:category", getProductsByCategory);

productsRoute.get("/products/:category/:id", getProductById);
productsRoute.post("/products", postProduct);
productsRoute.delete("/products/:title",isAuth,isAutho(['admin']),deleteProduct)



module.exports = productsRoute;