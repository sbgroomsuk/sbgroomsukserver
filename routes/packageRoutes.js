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
  const { category, item, total, offer, name } = req.body;
  try {
    const newProduct = new Package({ category, item, total, offer, name });
    await newProduct.save();
    res.status(201).json(newProduct);
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
 
