const mongoose = require("mongoose");
const shortid = require("shortid");
const rzp_instance = require("../payment/razorpay");
// const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/user");
// const Product = require("../models/product");
const Order = require("../models/order");

const createOrder = async (req, res) => {
  const options = {
    amount: req.body.totalAmount * 100,

    currency: "INR",

    receipt: shortid.generate(),
  };

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

    const response = await rzp_instance.orders.create(options);
    console.log("---resp---", response);

    const order = new Order({
      user: user._id, // user reference
      products,
      totalAmount,
    });

    // empty the cart, after order
    user.cart = [];
    await user.save();

    await order.save();
    res.status(201).json({
      status: true,
      message: "order placed successfully",
      order,
      orderResponse: response,
    });
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

const createOrderPayment = async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: short(),
  };
  console.log("---options---", options);
};

module.exports = { createOrder, getOrders, createOrderPayment };
