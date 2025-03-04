const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    items: [
      {
        item: { type: String, required: true }, // Name of the item
        quantity: { type: Number, required: true }, // Quantity of the item
      },
    ],
    total: { type: Number, required: true },
    offer: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true } // Enable `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Package", PackageSchema);
