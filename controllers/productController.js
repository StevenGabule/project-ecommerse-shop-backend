import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  } catch (error) {
    console.error(`${error.message}`);
    res.status(500).send(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    numReviews: 0,
    description: "example description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = product.save();
    return res.status(200).json(updatedProduct);
  }
  res.status(404);
  throw new Error("Product is not found!");
});

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
