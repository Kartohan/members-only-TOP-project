const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const imgs = [
  {
    url: "images/man.png",
    name: "man",
  },
  {
    url: "images/woman.png",
    name: "woman",
  },
  {
    url: "images/owl.png",
    name: "owl",
  },
  {
    url: "images/robot.png",
    name: "robot",
  },
  {
    url: "images/witch.png",
    name: "witch",
  },
  {
    url: "images/wolf.png",
    name: "wolf",
  },
];

exports.signUp_get = (req, res, next) => {
  res.render("sign-up", { imgs: imgs });
};

exports.signUp_post = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a name")
    .isAlphanumeric()
    .withMessage("First Name field allow only letters A-z and numbers 0-9")
    .escape(),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a Last Name")
    .isAlphanumeric()
    .withMessage("Last Name field allow only letters A-z and numbers 0-9")
    .escape(),
  body("userName")
    .trim()
    .isLength({ min: 4 })
    .withMessage("User Name must have at least 4 characters")
    .isAlphanumeric()
    .withMessage("User Name allow only letters A-z and numbers 0-9")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user !== null) {
        return Promise.reject();
      }
      return Promise.resolve();
    })
    .withMessage("User Name already exists")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long")
    .isAlphanumeric()
    .withMessage("Last Name field allow only letters A-z and numbers 0-9")
    .escape(),
  body("confirmPassword")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a password confirmation")
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password and password fields do not match");
      } else {
        return true;
      }
    }),
  body("avatar").custom((value, { req }) => {
    const array = ["man", "owl", "robot", "witch", "wolf", "woman"];
    if (!array.find((el) => value === el)) {
      throw new Error("Select avatar");
    } else {
      return true;
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.userName,
    };

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        errors: errors.array({ onlyFirstError: true }),
        imgs: imgs,
        user,
      });
      return;
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.userName,
        password: hashedPassword,
        image: req.body.avatar,
      });
      user.save((err) => {
        if (err) return next(err);
        res.redirect("/login");
      });
    });
  },
];
exports.logIn_get = [
  isNotAuth,
  (req, res, next) => {
    res.render("log-in");
  },
];
exports.logIn_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a username")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Enter a password")
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("log-in", {
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "login",
    failureFlash: true,
  }),
];

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function isNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
