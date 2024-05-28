// controllers/auctionController.js
const Auction = require('../models/AuctionItem.js');

const getAllItems = async (req, res) => {
  try {
    const items = await Auction.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllItems
};
