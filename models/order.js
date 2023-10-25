const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        title: String,
        description: String,
        price: Number,
      },
    ],
    totalAmount: Number,
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
