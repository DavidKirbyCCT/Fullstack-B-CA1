const express = require("express");
const passport = require("../config/passportConfig");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) res.redirect("/200");
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/404" }),
  (req, res) => {
    res.redirect("/?pagenum=1");
  }
);

module.exports = router;
