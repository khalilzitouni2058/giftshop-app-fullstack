const express = require("express");
const productsRoute = express.Router();
const {
    getProductsByCategory,
    postProduct,
    deleteProduct,
    getProductById,
    getProduct,
    getProducts,
    addReviewToProduct,
    updateProduct
    
} = require("../Controllers/productsController");
const isAuth = require("../middleware/isAuth")
const isAutho=require('../middleware/isAutho')


productsRoute.get("/products/:category", getProductsByCategory);
productsRoute.get("/products",getProduct)
productsRoute.get("/allproducts",getProducts)
productsRoute.get("/products/:category/:id", getProductById);
productsRoute.post("/products", postProduct);
productsRoute.delete("/products/:id",updateProduct);
productsRoute.delete("/products/:id",deleteProduct);
productsRoute.post("/products/:productId/reviews", addReviewToProduct);





module.exports = productsRoute;