const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const validator = require("validator");

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

postSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toFormat("dd.LL.yyyy, tt");
});

postSchema.virtual("message_unesc").get(function () {
  return validator.unescape(this.message);
});

postSchema.virtual("title_unesc").get(function () {
  return validator.unescape(this.title);
});

module.exports = mongoose.model("Post", postSchema);
