const express = require("express");
const passport = require("../config/passportConfig");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) res.redirect("/play");
  res.render("login.ejs");
});

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/play");
  }
);

module.exports = router;
