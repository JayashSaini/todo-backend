const Todo = require("../models/todo.model.js");

async function addTodo(req, res) {
  try {
    console.log("runngin add part");
    const { title, description } = req.body;
    const newtodo = new Todo({ title, description });

    await newtodo.save(); // <-- Corrected line
    return res.status(201).json({
      message: "Todo successfully created",
      data: newtodo,
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, success: false, data: {} });
  }
}

async function getAllTodos(req, res) {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      message: "Todos successfully accessed",
      data: todos,
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, success: false, data: {} });
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("Invalid todo Id");
    }
    return res.status(200).json({
      message: "Todo successfully accessed",
      data: todo,
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, success: false, data: {} });
  }
}

async function updateTodo(req, res) {
  let todo;
  try {
    const { newTitle, newDescription } = req.body;
    const { id } = req.params;

    todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("Todo doesn't exist");
    }

    if (!newTitle && !newDescription) {
      return res
        .status(400)
        .json({
          message: "At least one of title or description is required",
          success: false,
          data: {},
        });
    }

    const updateFields = {};
    if (newTitle) {
      updateFields.title = newTitle;
    }
    if (newDescription) {
      updateFields.description = newDescription;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedTodo) {
      throw new Error("Error occurred while updating todo");
    }
    return res.status(201).json({
      message: "Todo successfully updated",
      data: updatedTodo,
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, success: false, data: {} });
  }
}

async function deleteTodo(req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const deletedTodo = await Todo.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "Todo successfully deleted",
      data: deletedTodo,
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, success: false, data: {} });
  }
}
module.exports = {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
