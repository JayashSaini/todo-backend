<<<<<<< HEAD
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
=======
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
>>>>>>> 07e930bd6b0c4a356f6fd83300b11ea4d87e8463
