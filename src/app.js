const express = require("express");
const app = express();
const todoRoute = require("./routes/todo.routes.js");
const imageRoute = require("./routes/image.routes.js");

app.use(express.json({ limit: "20mb" }));

app.use("/wow", (req, res) => {
    res.send("adsf")
})

app.use("/api/v1/todo", todoRoute);
app.use("/api/v1/image", imageRoute);

module.exports = app;
