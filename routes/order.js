const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const orderController = require("../controllers/order");

router.post("/createOrder", auth, orderController.createOrder);
router.post("/getOrders", auth, orderController.getOrders);
// router.post("/createPayment", auth, orderController.createOrderPayment);

module.exports = router;
