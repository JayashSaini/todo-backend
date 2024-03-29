<<<<<<< HEAD
const { Router } = require("express");
const router = Router();

const {
  validateTodo,
  handleValidationErrors,
  updatationvalidateTodo,
} = require("../validators/todo.validator.js");

const {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controllers.js");

router.route("/addTodo").post(validateTodo, handleValidationErrors, addTodo);
router.route("/todos").get(getAllTodos);
router
  .route("/todos/:id")
  .get(getTodoById)
  .patch(updatationvalidateTodo, handleValidationErrors, updateTodo)
  .delete(deleteTodo);

module.exports = router;
=======
const { Router } = require("express");
const router = Router();

const {
  validateTodo,
  handleValidationErrors,
  updatationvalidateTodo,
} = require("../validators/todo.validator.js");
const {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controllers.js");

router.route("/addTodo").post(validateTodo, handleValidationErrors, addTodo);
router.route("/todos").get(getAllTodos);
router
  .route("/todos/:id")
  .get(getTodoById)
  .patch(updatationvalidateTodo, handleValidationErrors, updateTodo)
  .delete(deleteTodo);

module.exports = router;
>>>>>>> 07e930bd6b0c4a356f6fd83300b11ea4d87e8463
