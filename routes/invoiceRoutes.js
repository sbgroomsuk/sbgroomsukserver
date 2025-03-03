const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");
const mongoose = require("mongoose");

// GET next customer number
router.get("/next", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "customerNumber" },
      { $inc: { value: 1 } }, // Atomically increment
      { new: true, upsert: true } // Return the updated document
    );

    console.log("Updated Customer Number:", counter.value); // Debug output

    res.json({ customerNumber: counter.value.toString().padStart(3, "0") }); // Ensure 3-digit format
  } catch (error) {
    console.error("Error generating customer number:", error);
    res.status(500).json({ error: "Error generating customer number" });
  }
});

module.exports = router;
