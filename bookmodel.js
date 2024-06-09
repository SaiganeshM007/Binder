const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registeruser",
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
