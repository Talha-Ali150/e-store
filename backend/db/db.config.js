require("dotenv").config();
const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectToDb = async () => {
  try {
    const dbInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(`mongodb connected HOST: ${dbInstance.connection.host}`);
  } catch (e) {
    console.log("mongodb konnection error", e);
    process.exit(1);
  }
};

module.exports = connectToDb;
