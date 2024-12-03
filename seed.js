const mongoose = require("mongoose");
const Product = require("./models/products");

mongoose
  .connect("mongodb://localhost:27017/shop_db")
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

Product.insertMany([
  {
    name: "Mesin Cuci",
    price: 3000000,
    stock: 100,
    description: "Ini adalah mesin cuci",
    category: "Elektronik",
  },
  {
    name: "Handphone",
    price: 2000000,
    stock: 100,
    description: "Ini adalah handphone",
    category: "elektronik",
  },
  {
    name: "Baju",
    price: 100000,
    stock: 100,
    description: "Ini adalah baju",
    category: "pakaian",
  },
  {
    name: "Celana",
    price: 200000,
    stock: 100,
    description: "Ini adalah celana",
    category: "Pakaian",
  },
  {
    name: "Sweater",
    price: 500000,
    stock: 100,
    description: "ini adalah Sweater",
    category: "Pakaian",
  },
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
