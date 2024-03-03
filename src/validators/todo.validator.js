<<<<<<< HEAD
const { body, validationResult, param } = require("express-validator");
const Todo = require("../models/todo.model.js");

const validateTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("title").custom(async (value, { req }) => {
    const existingTodo = await Todo.findOne({ title: value });
    if (existingTodo) {
      throw new Error("Todo with this title already exists");
    }

    return true;
  }),
];

const updatationvalidateTodo = [
  param("id")
    .notEmpty()
    .withMessage("Todo ID is required")
    .isMongoId()
    .withMessage("Invalid Todo ID"),

  body("newTitle").optional().isString().withMessage("Title must be a string"),

  body("newDescription")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("newTitle").custom(async (value, { req }) => {
    const existingTodo = await Todo.findOne({ title: value });
    if (existingTodo) {
      throw new Error("Todo with this title already exists");
    }

    return true;
  }),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(1) });
  }
  next();
};

module.exports = {
  validateTodo,
  handleValidationErrors,
  updatationvalidateTodo,
};
=======
const { body, validationResult, param } = require("express-validator");
const Todo = require("../models/todo.model.js");

const validateTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("title").custom(async (value, { req }) => {
    const existingTodo = await Todo.findOne({ title: value });
    if (existingTodo) {
      throw new Error("Todo with this title already exists");
    }

    return true;
  }),
];

const updatationvalidateTodo = [
  param("id")
    .notEmpty()
    .withMessage("Todo ID is required")
    .isMongoId()
    .withMessage("Invalid Todo ID"),

  body("newTitle").optional().isString().withMessage("Title must be a string"),

  body("newDescription")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("newTitle").custom(async (value, { req }) => {
    const existingTodo = await Todo.findOne({ title: value });
    if (existingTodo) {
      throw new Error("Todo with this title already exists");
    }

    return true;
  }),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(1) });
  }
  next();
};

module.exports = {
  validateTodo,
  handleValidationErrors,
  updatationvalidateTodo,
};
>>>>>>> 07e930bd6b0c4a356f6fd83300b11ea4d87e8463
