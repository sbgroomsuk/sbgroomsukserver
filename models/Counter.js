const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 1 } // Starts at 1
});

module.exports = mongoose.model("Counter", CounterSchema);
