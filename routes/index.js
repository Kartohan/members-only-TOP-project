const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/login", authController.logIn_get);
router.post("/login", authController.logIn_post);
router.post("/signup", authController.signUp_post);
router.get("/signup", authController.signUp_get);
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
