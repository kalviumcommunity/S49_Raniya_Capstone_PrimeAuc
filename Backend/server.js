// Importing required libraries and dependencies
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

// Creating an Express app
const app = express();

// Setting the server port
const port = process.env.PUBLIC_PORT || 3000;

// MongoDB connection URI
const uri = process.env.MONGO_DB_URI;

// Async function to connect to the MongoDB database
async function connectToDB() {
    try {
        await mongoose.connect(uri); // Connect to MongoDB
        console.log("Connected to DB"); // Log success
    } catch (error) {
        console.error("Error connecting to DB:", error); // Log error
        throw error;
    }
}

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ "message": "e-auctioning platform" });
});

// Connect to DB and start server
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
    });
});

// Exporting the Express app
module.exports = app;
