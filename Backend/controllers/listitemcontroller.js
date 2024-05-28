// controllers/listItemController.js
const multer = require('multer');
const Auction = require('../models/AuctionItem.js');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const listItem = async (req, res) => {
  try {
    const { category, title, description, startTime, endTime, reservePrice, lot_no } = req.body;
    const file = req.file; // Multer handles the file

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const imagePath = `http://localhost:3000/uploads/${file.filename}`;

    const newItem = {
      title: title,
      description: description,
      lot_no: lot_no,
      image: imagePath, // Save only the image path
      reserve_price: reservePrice,
      start_time: startTime,
      end_time: endTime,
      status: 'Upcoming',
      starting_price: reservePrice * 0.25
    };

    // Find the auction document by category and update
    const auction = await Auction.findOneAndUpdate(
      { category: category },
      { $push: { items: newItem } },
      { new: true, upsert: true } // Create a new document if none exists
    );

    res.status(200).json({ success: true, auction: auction });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  upload,
  listItem
};
