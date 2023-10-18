const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({
        status: false,
        message: "all fields are required",
      });
    }

    const newProduct = new Product({ title, description, price });
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

module.exports = { addProduct, getProduct };
