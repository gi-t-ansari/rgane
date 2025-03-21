const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../config/passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req?.user?._id, email: req?.user?.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, user: req?.user });
  }
);

module.exports = router;
