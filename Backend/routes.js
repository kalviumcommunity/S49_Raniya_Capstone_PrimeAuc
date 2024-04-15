const express = require('express');
const router = express.Router();
const { UserModel } = require('../Backend/models/User'); // Correct path to user model
const { signUpSchema, loginSchema } = require('../Backend/models/userValidation');
const Joi = require('joi');
const Auction = require('./models/AuctionItem.js');

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ "message": "e-auctioning platform" });
});
router.get('/items', async (req, res) => {
  try {
    const items = await Auction.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/users', async (req, res) => {
    try {
        const data = await UserModel.find();
        console.log("Query executed:", data); // Log the query result
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}); 

// Example route for user signup
router.post('/signup', async (req, res) => {
    console.log(req.body);
  try {
    // Validate request body
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Create a new user
    const newUser = await UserModel.create(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
    console.log(req.body);
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Check if the user exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if the password matches
    if (req.body.password !== user.password) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
