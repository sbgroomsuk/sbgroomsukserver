const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");
const mongoose = require("mongoose");

// Function to get the next customer number
const getNextCustomerNumber = async () => {
  let counter = await Counter.findOne({ name: "customerNumber" });

  if (!counter) {
    counter = new Counter({ name: "customerNumber", value: 1 });
  } else {
    counter.value += 1;
  }

  await counter.save();
  return counter.value.toString().padStart(3, "0"); // Format as "001"
};

// GET next customer number
router.get("/next", async (req, res) => {
  try {
    const nextCustomerNumber = await getNextCustomerNumber();
    res.json({ customerNumber: nextCustomerNumber });
  } catch (error) {
    res.status(500).json({ error: "Error generating customer number" });
  }
});

module.exports = router;
