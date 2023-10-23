const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { title, description, url, price } = req.body;

    if (!title || !description || !price || !url) {
      return res.status(400).json({
        status: false,
        message: "all fields are required",
      });
    }

    const newProduct = new Product({ title, description, url, price });
    await newProduct.save();

    return res.status(201).json({
      status: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "internal server error",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: true, products });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    const regex = new RegExp(searchQuery, "i");

    const results = await Product.find({ title: regex });
    res.json({ status: true, message: "successfully searched", results });
  } catch (error) {
    res.status(500).json({ status: false, message: "An error occurred" });
  }
};

module.exports = { addProduct, getProduct, searchProduct };
