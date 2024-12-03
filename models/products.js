const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
