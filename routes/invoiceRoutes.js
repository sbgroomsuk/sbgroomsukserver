const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");
const mongoose = require("mongoose");

// ✅ GET current customer number (without updating)
router.get("/current", async (req, res) => {
  try {
    const counter = await Counter.findOne({ name: "customerNumber" });

    if (!counter) {
      // If no counter exists, return "000" (or initialize it)
      return res.json({ customerNumber: "000" });
    }

    console.log("Fetched Customer Number:", counter.value); // Debug output

    res.json({ customerNumber: counter.value.toString().padStart(3, "0") });
  } catch (error) {
    console.error("Error fetching customer number:", error);
    res.status(500).json({ error: "Error fetching customer number" });
  }
});

// ✅ POST to increment and update customer number
router.post("/update", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "customerNumber" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    console.log("Updated Customer Number:", counter.value); // Debug output

    res.json({ customerNumber: counter.value.toString().padStart(3, "0") });
  } catch (error) {
    console.error("Error updating customer number:", error);
    res.status(500).json({ error: "Error updating customer number" });
  }
});

module.exports = router;
