const express = require("express");

const Router = express.Router();

Router.get("/", async (req, res) => {
  res.send("get all contacts");
});

module.exports = Router;
  