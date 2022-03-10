const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: [true, "Content is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
