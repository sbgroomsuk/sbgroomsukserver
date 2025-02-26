const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },// Store as an array of image URLs
    category: { type: String, required: true },
    description: [
      {
        text: { type: String, required: true },
        colors: [
          {
            color: { type: String, required: true },
            image: { type: String, required: true } // Store image URL or Base64
          }
        ]
      }
    ],    // Store as an array of colors
  },
  { timestamps: true } // Enable `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Product", ProductSchema);
 
