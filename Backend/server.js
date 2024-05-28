// Importing required libraries and dependencies
require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/Connection.js");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Create an instance of Express app
const app = express();

// Importing routes
const auctionRoutes = require("./routes/auctionlistroutes.js");
const bidItemRoutes = require("./routes/bidcontroller.js");
const listItemRoutes = require("./routes/listitemroutes.js");
const lotnoRoutes = require("./routes/lotnoroutes.js");
const authRoutes = require("./routes/authroutes.js");
const userRoutes = require("./routes/userroutes.js");
const itemRoutes = require("./routes/itemroutes.js");

// Middleware setup
// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// Parse JSON requests
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

// Mount routes
app.use("/", listItemRoutes);   // Routes for listing items
app.use("/", bidItemRoutes);    // Routes for bidding on items
app.use("/", auctionRoutes);     // Routes for auction items
app.use("/", lotnoRoutes);      // Routes for lot numbers
app.use("/", userRoutes);        // Routes for user management
app.use("/", authRoutes);        // Routes for authentication
app.use("/", itemRoutes);        // Routes for item details

// Connect to DB and start server
connectToDB().then(() => {
  // Start the Express server
  const port = process.env.PUBLIC_PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
  });
});

// Exporting the Express app
module.exports = app;
