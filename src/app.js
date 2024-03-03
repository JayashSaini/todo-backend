<<<<<<< HEAD
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
=======
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
>>>>>>> 07e930bd6b0c4a356f6fd83300b11ea4d87e8463
