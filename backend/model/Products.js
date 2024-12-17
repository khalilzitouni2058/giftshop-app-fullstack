

const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    brand:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
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
    quantity:{
        type: Number,
        required: true,
    },
    tags:{
        type: [String],
        required:true,
    }
    
});

module.exports = mongoose.model('Products', ProductsSchema);
