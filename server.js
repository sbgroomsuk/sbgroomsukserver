const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/package", require("./routes/packageRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
