const mongoose = require("mongoose");
const { MONGO_CONNECTION_STRING } = require("../config");

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("open", async () => {
  console.log("Db Connected!");
});

db.on("error", console.error.bind(console, "Db connection error:"));

module.exports = db;
