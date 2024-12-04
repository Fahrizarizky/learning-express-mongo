const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/shop_db")
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//Import Model
const Product = require("./models/products");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
  const detailProducts = await Product.findById(req.params.id);
  res.render("products/detail", { detailProducts });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
