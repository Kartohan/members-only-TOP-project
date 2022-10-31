const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  message: String,
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", postSchema);
