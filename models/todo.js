const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  externalId: Number,
  title: String,
  completed: Boolean,
});

module.exports = mongoose.model("Todo", todoSchema);
