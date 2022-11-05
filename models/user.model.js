const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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

userSchema.virtual("fullName").get(function () {
  return `${this.firstName + " " + this.lastName}`;
});

userSchema.virtual("joinDate_formatted").get(function () {
  return this.joinDate.toLocaleString(DateTime.DATE_SHORT);
});

userSchema.virtual("img").get(function () {
  return "images/" + this.image + ".png";
});
module.exports = mongoose.model("User", userSchema);
