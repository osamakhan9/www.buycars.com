const mongoose = require("mongoose");
require('dotenv').config();
const connection = async () => {
  return mongoose.connect(process.env.DB_URL);
};

module.exports = connection;