const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const wishlistController = require("../controllers/wishlist");

router.post("/add", auth, wishlistController.addToWishlist);
router.post("/remove", auth, wishlistController.removeFromWishlist);

module.exports = router;
