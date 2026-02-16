const express = require("express");
const { fetchAndSaveTodo } = require("../controllers/todoController");

const router = express.Router();

router.get("/fetch", fetchAndSaveTodo);

module.exports = router;
