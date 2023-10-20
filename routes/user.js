const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/emptyCart", auth, userController.emptyCart);
module.exports = router;
