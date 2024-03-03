<<<<<<< HEAD
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

const app = require("./app.js");
const connectDB = require("./db/index.js");

(async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error || "Somthing went wrong while running the server");
  }
})();
=======
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});
const app = require("./app.js");
const connectDB = require("./db/index.js");

(async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error || "Somthing went wrong while running the server");
  }
})();
>>>>>>> 07e930bd6b0c4a356f6fd83300b11ea4d87e8463
