const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

//Import Model
const Product = require("./models/products");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", {
      products,
      title: "Category " + category,
    });
  }
  const products = await Product.find({});
  res.render("products/index", { products, title: "All Products" });
});

app.get("/products/create", (req, res) => {
  res.render("products/create");
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect("/products/" + product._id);
});

app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/products/" + product._id);
});

app.get("/products/:id/edit", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.get("/products/:id", async (req, res) => {
  const detailProducts = await Product.findById(req.params.id);
  res.render("products/detail", { detailProducts });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
