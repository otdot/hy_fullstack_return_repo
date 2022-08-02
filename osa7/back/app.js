const { MONGODB_URI, PORT } = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const resetRouter = require("./controllers/reset");
const middleware = require("./utils/middleware");

const mongoose = require("mongoose");
const mongoUrl = MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/reset", resetRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
module.exports = app;
