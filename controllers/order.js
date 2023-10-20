const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/user");
// const Product = require("../models/product");
const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const totalAmount = products.reduce(
    //   (total, product) => total + product.price * product.quantity,
    //   0
    // );

    const order = new Order({
      user: user._id, // user reference
      products,
      totalAmount,
    });

    // empty the cart, after order
    user.cart = [];
    await user.save();

    await order.save();
    res
      .status(201)
      .json({ status: true, message: "order placed successfully", order });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.user;

    const orders = await Order.find({ user: userId });

    res
      .status(200)
      .json({ status: true, message: "orders get successfully", orders });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: "internal server error" });
  }
};

module.exports = { createOrder, getOrders };
