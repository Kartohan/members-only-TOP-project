const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const indexController = require("../controllers/indexController");
const formController = require("../controllers/formController");

router.get("/login", authController.logIn_get);
router.post("/login", authController.logIn_post);
router.post("/signup", authController.signUp_post);
router.get("/signup", authController.signUp_get);
router.get("/logout", indexController.index_logOut);
router.get("/membership", formController.form_member_get);
router.post("/membership", formController.form_member_post);
router.get("/", indexController.index_Get);

module.exports = router;
