const express = require("express");
const passport = require("../config/passportConfig");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.isAuthenticated()) res.redirect("/login");
  res.render("play.ejs");
});

module.exports = router;
