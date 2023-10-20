const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const RZP_KEY_ID = process.env.RZP_KEY_ID;
const RZP_KEY_SECRET = process.env.RZP_KEY_SECRET;

module.exports = {
  MONGO_CONNECTION_STRING,
  JWT_SECRET,
  PORT,
  RZP_KEY_ID,
  RZP_KEY_SECRET,
};
