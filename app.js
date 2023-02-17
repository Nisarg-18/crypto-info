require("dotenv").config();

const express = require("express");
const infoRouter = require("./routes/infoRoutes");
const path = require("path")

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", infoRouter);

// serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

module.exports = app;
