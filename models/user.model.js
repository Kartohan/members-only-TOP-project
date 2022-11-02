const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  member: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
  joinDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  image: String,
});

module.exports = mongoose.model("User", userSchema);
