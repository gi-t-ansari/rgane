const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({ secret: "secretKey", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);
