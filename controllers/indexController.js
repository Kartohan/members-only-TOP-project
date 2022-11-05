const Post = require("../models/post.model");

exports.index_Get = (req, res, next) => {
  Post.find()
    .sort({ timestamp: -1 })
    .populate("created_by")
    .exec((err, posts) => {
      if (req.isAuthenticated()) {
        res.render("index", {
          user: req.user,
          posts,
        });
        return;
      }
      res.render("index", {
        posts,
      });
    });
};

exports.index_logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return;
  });
  res.redirect("/");
};
