// routes/auctionRoutes.js
const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionlistcontroller');

router.get('/items', auctionController.getAllItems);

module.exports = router;
