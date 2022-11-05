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
          title: "Members Only",
        });
        return;
      }
      res.render("index", {
        posts,
        title: "Members Only",
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

exports.index_deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.body.postid, (err) => {
    if (err) return next(err);
  });
  res.redirect("/");
};
