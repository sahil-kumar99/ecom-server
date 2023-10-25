const express = require("express");
const auth = require("../middlewares/auth");
const paymentController = require("../controllers/payment");

const router = express.Router();

router.post("/createPayment", auth, paymentController.createPayment);

module.exports = router;
