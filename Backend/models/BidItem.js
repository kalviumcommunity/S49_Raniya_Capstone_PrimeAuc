const mongoose = require('mongoose');
const Joi = require('joi');

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

// Define Joi schema for bid
const bidJoiSchema = Joi.object({
    userbid_no: Joi.string().required(),
    ip_address: Joi.string().ip().required(), // Validate as IP address
    amount: Joi.number().required(),
    timestamp: Joi.date().required()
  });

// Define Joi schema for lot
const lotJoiSchema = Joi.object({
  lot_no: Joi.string().required(),
  reserve_price: Joi.number().required(),
  bids: Joi.array().items(bidJoiSchema)
});

// Validation function for lot
 function validateLot(lot) {
  return lotJoiSchema.validate(lot);
}

// Validation function for bid
function validateBid(bid) {
  return bidJoiSchema.validate(bid);
}

module.exports = {
  Lot,
  validateLot,
  validateBid
};
