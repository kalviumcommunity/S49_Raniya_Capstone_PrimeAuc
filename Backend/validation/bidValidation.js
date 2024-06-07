const Joi = require('joi');

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
  validateLot,
  validateBid
};