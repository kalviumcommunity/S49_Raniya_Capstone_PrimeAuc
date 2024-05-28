// controllers/itemController.js
const Auction = require('../models/AuctionItem.js');

const getItemByLotNo = async (req, res) => {
  try {
    const lot_no = req.params.lot_no;

    const auctions = await Auction.find({}); // Assuming this retrieves an array of objects

    // Extract items from each object and concatenate them into a single array
    const allItems = auctions.reduce((acc, curr) => {
      // Extract items array from each object and concatenate with accumulator array
      return acc.concat(curr.items);
    }, []);

    const item = allItems.find(item => item.lot_no === lot_no);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getItemByLotNo
};
