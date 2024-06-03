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

// Middleware setup
// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// Parse JSON requests
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

// Importing middleware to validate JWT
// const authenticateJWT = require("./middlewares/authenticateJWT.js");

// Mount routes
// app.use("/", authenticateJWT); // Apply JWT authentication to all routes below this middleware
app.use("/", require("./routes/auctionlistroutes.js")); // Routes for auction list
app.use("/", require("./routes/bidcontroller.js")); // Routes for bidding on items
app.use("/", require("./routes/listitemroutes.js")); // Routes for listing items
app.use("/", require("./routes/lotnoroutes.js")); // Routes for lot numbers
app.use("/", require("./routes/userbidnoroutes.js")); // Routes for userbid numbers
app.use("/", require("./routes/authroutes.js")); // Routes for authentication
app.use("/", require("./routes/userroutes.js")); // Routes for user management
app.use("/", require("./routes/itemroutes.js")); // Routes for item details

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
