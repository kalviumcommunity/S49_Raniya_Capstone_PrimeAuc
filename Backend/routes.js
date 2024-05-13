const express = require('express');
const router = express.Router();
const { UserModel } = require('../Backend/models/User'); // Correct path to user model
const { signUpSchema, loginSchema } = require('../Backend/models/userValidation');
const Joi = require('joi');
const Auction = require('./models/AuctionItem.js');
const { Lot, validateLot, validateBid } = require('./models/BidItem.js');


// Route to get all bititems and it details
router.get('/biditems',async(req,res)=>{
  try{
    const biditems= await Lot.find();
    res.json( biditems);
  }
  catch(err){
    res.json(err);
  }
})


// Route to create a new bid for a lot
router.post('/lots/:lot_no/bids', async (req, res) => {
  const { lot_no } = req.params;
  console.log('Received request to create bid for lot ID:', lot_no);
  console.log('Request body:', req.body);
  const { error } = validateBid(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  try {
    
    let lot = await Lot.findOne({ lot_no: lot_no });

    // If the lot doesn't exist, create a new one
    if (!lot) {
      console.log('Lot not found, creating a new lot:', lot_no);
      lot = new Lot({
        lot_no: lot_no,
        reserve_price: 0, // Set reserve_price as needed
        bids: []
      });
    }

    // Add the bid to the lot
    const validatedBid = validateLot(req.body);
    lot.bids.push(req.body);
    await lot.save(); 

    console.log('Bid created successfully:', lot);
    res.status(201).send(lot);
  } catch (err) {
    console.error('Error creating bid:', err);
    res.status(500).send('Error creating bid');
  }
});


// Test endpoint
router.get('/test', (req, res) => {
  res.json({ "message": "e-auctioning platform" });
});


//get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Auction.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//get item by lot no
router.get('/itemdetails/:lot_no', async (req, res) => {
  try{
  const lot_no = req.params.lot_no;

  const items = await Auction.find({}); // Assuming this retrieves an array of objects

// Extract items from each object and concatenate them into a single array
const allItems = items.reduce((acc, curr) => {
    // Extract items array from each object and concatenate with accumulator array
    return acc.concat(curr.items);
}, []);
const item = allItems.find(item => item.lot_no === lot_no);
        if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//get all users
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

// route for user signup
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
