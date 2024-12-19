const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    comment: { type: String, required: false },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
  });

const ProductsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    imageURL: {
        type: String,
        required: true,
    },
    subImageURL1: {
        type: String,
        required: false,
    },
    subImageURL2: {
        type: String,
        required: false,
    },
    subImageURL3: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: false,
    },
    tags: {
        type: [String],
        required: true,
    },
    reviews: [reviewSchema], 
    

     
});

module.exports = mongoose.model('Products', ProductsSchema);
