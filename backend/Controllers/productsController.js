const Product = require("../model/Products");  
const productsRoute = require("../Routes/productsRoute");

const getProducts = async (req, res) => {
      
    try {
        const products = await Product.find();
        /*console.log(products)*/  
        if (products && products.length > 0) {
            res.status(200).json({ products: products });
        } else {
            res.status(404).json({ msg: "No products found " });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error on getting products" });
    }
};

const getProductsByCategory = async (req, res) => {
    const category = req.params.category;  
    //console.log(category);
    try {
        const products = await Product.find({ category: category });
        //console.log(products)  
        if (products && products.length > 0) {
            res.status(200).json({ products: products });
        } else {
            res.status(404).json({ msg: "No products found in this category" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error on getting products" });
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id; 
    try {
        const product = await Product.findById(id); 
        if (product) {
            res.status(200).json({ product }); 
        } else {
            res.status(404).json({ msg: "Product not found" }); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error retrieving product" }); 
    }
};
const getProduct= async (req, res) => {
        try {
          const { productId } = req.query; // Retrieve userId from query params
          const product = await Product.findOne({ _id: productId }); 
            console.log
          if (!product) {
            return res.status(404).json({ message: "product not found" });
          }
      
          res.status(200).json(product); 
        } catch (error) {
          res.status(500).json({ message: "Error fetching favorites", error });
        }
      };



    




// const postOneProduct = async (req, res) => {
//     const product = req.body;
//     try {
//         const newProduct = new Product(product);  
//         await newProduct.save();
//         res.status(200).json({ product: newProduct, msg: "Product successfully added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Error on adding product" });
//     }
// };





const postProduct = async (req, res) => {
    const products = req.body;  
    try {
        if (Array.isArray(products)) {
            const newProducts = await Product.insertMany(products); 
            res.status(200).json({ products: newProducts, msg: "Products successfully added" });
        } else {
            res.status(400).json({ msg: "Invalid input. Expected an array of products." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error on adding products" });
    }
};

const deleteProduct = async (req, res) => {
    //console.log("hello")
    const {id} = req.params.id; 
    console.log(id)
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: id });
        if (deletedProduct) {
            res.status(200).json({ msg: "Product successfully deleted" });
        } else {
            res.status(404).json({ msg: "No product found with the given id" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error on deleting product" });
    }
};



const addReviewToProduct = async (req, res) => {
    const { productId } = req.params;  // Get the product ID from URL params
    const {  userName, comment, rating } = req.body;  // Get review details from request body

    // Validate the review data
    

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: "Rating must be between 1 and 5" });
    }

    try {
        // Find the product by ID and update the reviews array
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        // Create the new review object
        const newReview = {
            userName,
            comment,
            rating,
            date: new Date(),
        };

        // Push the new review to the product's reviews array
        product.reviews.push(newReview);

        // Save the updated product
        await product.save();

        // Return the updated product with the new review
        res.status(200).json({ product, msg: "Review added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error adding review" });
    }
};



module.exports = {
    getProductsByCategory,
    postProduct,
    deleteProduct,
    getProductById,
    getProduct,
    getProducts,
    addReviewToProduct,
};
