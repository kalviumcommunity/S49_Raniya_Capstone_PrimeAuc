// Importing required libraries and dependencies
require("dotenv").config();
const express = require('express');
const connectToDB =require("./connection/Connection.js");
const port = process.env.PUBLIC_PORT || 3000;
const bodyParser=require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require("cors");

const auctionRoutes = require('./routes/auctionitemlistroutes.js');
const lotnoRoutes = require('./routes/lotnoroutes.js');
const listItemRoutes = require('./routes/listitemroutes.js');
const bidItemRoutes = require('./routes/biditemcontroller.js');
const authRoutes = require('./routes/authroutes.js');
const userRoutes = require('./routes/userroutes.js');
const itemRoutes = require('./routes/itemroutes.js'); // Including item routes


app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors());

app.use('/', auctionRoutes);
app.use('/', lotnoRoutes);
app.use('/', listItemRoutes);
app.use('/', bidItemRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', itemRoutes); // Mounting the item routes as well


// Connect to DB and start server
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
    });
});

// Exporting the Express app
module.exports = app;
