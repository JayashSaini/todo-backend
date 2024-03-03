<<<<<<< HEAD
const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
=======
const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
>>>>>>> 07e930bd6b0c4a356f6fd83300b11ea4d87e8463
