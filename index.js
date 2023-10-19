require("dotenv").config();
require("./models");
const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");
const app = express();
const UserRouter = require("./routes/user");
const ProductRouter = require("./routes/product");
const WishlistRouter = require("./routes/wishlist");
const cartRouter = require("./routes/cart");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/wishlist", WishlistRouter);
app.use("/cart", cartRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
