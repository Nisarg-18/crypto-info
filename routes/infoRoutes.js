const express = require("express");
const { getInfo } = require("../controllers/infoController");

const infoRouter = express.Router();

infoRouter.get("/cryptoinfo", getInfo);

module.exports = infoRouter;
