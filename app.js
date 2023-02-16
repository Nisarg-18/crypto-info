require("dotenv").config();

const express = require("express");
const infoRouter = require("./routes/infoRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", infoRouter);

module.exports = app;
