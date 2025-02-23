const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    item: { type: [String], required: true },
    total: { type: Number, required: true },
    offer: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true } // Enable `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Package", PackageSchema);
 
