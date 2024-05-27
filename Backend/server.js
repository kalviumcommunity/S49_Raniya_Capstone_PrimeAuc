// Importing required libraries and dependencies
const express = require('express');
require("dotenv").config();
const fs = require('fs');

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


let sequence = 'AA0000';

// Load sequence from file on startup
fs.readFile('sequence.txt', 'utf8', (err, data) => {
  if (!err && data) {
    sequence = data;
  }
});

app.get('/current-sequence', (req, res) => {
  res.json({ sequence });
});

app.post('/update-sequence', (req, res) => {
  sequence = req.body.sequence;
  fs.writeFile('sequence.txt', sequence, (err) => {
    if (err) {
      console.error("Error saving sequence:", err);
      res.status(500).json({ error: 'Failed to save sequence' });
    } else {
      res.status(200).json({ message: 'Sequence updated successfully' });
    }
  });
});

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
