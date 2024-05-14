require("dotenv").config();
const mongoose = require("mongoose");
let  DB_NAME;

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
