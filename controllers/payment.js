const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Payment = require("../models/payment");
const Order = require("../models/order");

const createPayment = async (req, res) => {
  try {
    const {
      order_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found",
      });
    }

    const newPayment = new Payment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      paymentSign: razorpay_signature,
      order: order._id,
    });

    order.status = "success";
    await order.save();
    await newPayment.save();
    return res
      .status(200)
      .json({ status: true, message: "order placed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};

module.exports = { createPayment };
