const mongoose = require('mongoose');


// Define Mongoose schema for bid
const bidSchema = new mongoose.Schema({
  
  userbid_no: { type: String, required: true },
  ip_address: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, required: true }
});

// Define Mongoose schema for lot
const lotSchema = new mongoose.Schema({
  lot_no: { type: String, required: true },
  reserve_price: { type: Number, required: true },
  bids: [bidSchema]
});

const Lot = mongoose.model('biditem', lotSchema);


module.exports = {Lot};
