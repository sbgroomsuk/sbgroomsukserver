const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("Account", AccountSchema);
 
