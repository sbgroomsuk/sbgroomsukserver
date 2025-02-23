const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Ensure the admin account exists on startup
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Account.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.password !== password) { 
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("🔍 Checking if admin exists...");

    let admin = await Account.findOne({ username: "admin" });

    if (!admin) {
      console.log("⚠️ Admin account not found. Creating one...");

      const hashedPassword = "123456";

      admin = new Account({
        username: "admin",
        password: hashedPassword,
        role: "all",
      });

      await admin.save();
      console.log("✅ Admin account created!");
    }
    res.json({ message: "Admin account verified", admin });
  } catch (err) {
    console.error("❌ Error fetching admin:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/get-account", async (req, res) => {
  try {
    let accs = await Account.find();
    res.json(accs);
  } catch (err) {
    console.error("❌ Error fetching account:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/fetch-account/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log("🔹 Fetching account for:", username); // Debugging log

    const user = await Account.findOne({ username }); // Find a single user

    if (!user) {
      console.warn("⚠️ User not found in database:", username);
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching account:", err);
    res.status(500).json({ error: err.message });
  }
});


router.post("/create", async (req, res) => {
  const { username,password, fullname, role } = req.body;
  try {
    const newAccount = new Account({ username, password, fullname, role });
    await newAccount.save();
    res.status(201).json(newAccount);
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

    const deletedItem = await Account.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({ message: "Account deleted successfully", deletedItem });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// UPDATE admin password
router.put("/update-password", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    const hashedPassword = password;

    const updatedAdmin = await Account.findOneAndUpdate(
      { username: username }, // Find the admin account
      { password: hashedPassword }, // Update password
      { new: true } // Return updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin account not found" });
    }

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
