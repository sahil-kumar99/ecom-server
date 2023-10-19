const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const cartController = require("../controllers/cart");

router.post("/addCart", auth, cartController.addCart);
router.post("/removeCart", auth, cartController.removeCart);

module.exports = router;
