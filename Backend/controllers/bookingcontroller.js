const Booking = require('../models/Booking');
const User = require('../models/User');
const Auction = require('../models/AuctionItem');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Make sure to set this in your environment variables
