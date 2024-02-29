const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const todoRouter = require("./routes/todo.routes.js");
const userRouter = require("./routes/user.routes.js");

app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

module.exports = app;
