const User = require("../models/user.model");

exports.signUp_get = (req, res, next) => {
  res.render("sign-up");
};

exports.signUp_post = (req, res, next) => {
  console.log(req.body);
  res.send("Not implemented");
};
exports.logIn_get = (req, res, next) => {
  res.render("log-in");
};
exports.logIn_post = (req, res, next) => {
  res.send("Not implemented");
};
