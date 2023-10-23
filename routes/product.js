const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.post("/create", productController.addProduct);
router.get("/get", productController.getProduct);
router.get("/search", productController.searchProduct);

module.exports = router;
