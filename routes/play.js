const express = require("express");
const passport = require("../config/passportConfig");
const router = express.Router();
const { tileNxN } = require("../config/gameConfig");

router.get("/", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/login");
  res.render("play.ejs", { tileNxN });
});

module.exports = router;
  