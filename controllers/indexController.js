exports.index_Get = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", {
      user: req.user,
    });
    return;
  }
  res.render("index");
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
