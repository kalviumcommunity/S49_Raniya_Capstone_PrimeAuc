// controllers/bidItemController.js
const Auction = require('../models/AuctionItem.js');
const { Lot, validateLot, validateBid } = require('../models/BidItem.js');


const updateItemStatus = async (req, res) => {
  const { lot_no, status } = req.body;

  try {
    const updatedItem = await Auction.findOneAndUpdate(
      { 'items.lot_no': lot_no },
      { $set: { 'items.$.status': status } },
      { new: true }
    );

    if (updatedItem) {
      res.status(200).send({ message: 'Status updated successfully', item: updatedItem });
    } else {
      res.status(404).send({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
};

const getBidItems = async (req, res) => {
  try {
    const biditems = await Lot.find();
    res.json(biditems);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

const createBid = async (req, res) => {
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
};

module.exports = {
  updateItemStatus,
  getBidItems,
  createBid
};
