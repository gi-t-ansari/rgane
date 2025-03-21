const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  const response = await axios.post(
    "https://gemini-api.com/generate",
    { prompt },
    { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
  );

  res.json({ response: response?.data });
});

module.exports = router;
