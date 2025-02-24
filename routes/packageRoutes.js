const express = require("express");
const router = express.Router();
const Package = require("../models/Package");
const mongoose = require("mongoose");
// GET all products
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let items;

    if (category && category !== "Home") {
      items = await Package.find({ category }).sort({ createdAt: -1 });
    } else {
      items = await Package.find().sort({ createdAt: -1 });
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST a new product
router.post("/", async (req, res) => {
  const { category, items, total, offer, name } = req.body; // Use `items` instead of `item`
  
  try {
    // Validate required fields
    if (!category || !name || !total || !offer || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "All fields are required, including items." });
    }

    // Validate that all items have `item` and `quantity`
    for (const entry of items) {
      if (!entry.item || !entry.quantity) {
        return res.status(400).json({ error: "Each item must have a name and quantity." });
      }
    }

    // Create new package
    const newPackage = new Package({ category, items, total, offer, name });
    await newPackage.save();
    
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID for deletion:", id); // Debugging log

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deletedItem = await Package.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", deletedItem });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
 
