// Importing required libraries and dependencies
const express = require('express');
require("dotenv").config();

const connectToDB =require("./Connection.js");
const bodyParser=require('body-parser');
const path = require('path');

// Import routes after defining the MongoDB client
const routes = require("./routes");

// Creating an Express app
const app = express();
app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const cors = require("cors");
app.use(cors());

// Setting the server port
const port = process.env.PUBLIC_PORT || 3000;

// Routes
app.use("/", routes); // Mount the routes at the root URL

// Connect to DB and start server
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
    });
});

// Exporting the Express app

module.exports = app;
