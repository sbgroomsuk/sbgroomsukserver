const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  log: { type: String, required: true },
});

module.exports = mongoose.model("Logs", LogsSchema);
 
