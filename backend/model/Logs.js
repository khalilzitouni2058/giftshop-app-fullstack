const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});


const LogsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  products: [ProductSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save Hook to Calculate Total Price
LogsSchema.pre("save", function (next) {
  if (this.products && this.products.length > 0) {
    this.totalPrice = this.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }
  next();
});


const Logs = mongoose.model("Logs", LogsSchema);

module.exports = Logs;
