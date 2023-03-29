const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const propertyRouter = require("./routes/property");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", authRouter);
app.use("/review", reviewRouter);
app.use("/property", propertyRouter);

module.exports = app;
