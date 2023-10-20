const Razorpay = require("razorpay");
import { RZP_KEY_ID, RZP_KEY_SECRET } from "../config";

const rzp_instance = new Razorpay({
  key_id: RZP_KEY_ID,
  key_secret: RZP_KEY_SECRET,
});

module.exports = rzp_instance;
