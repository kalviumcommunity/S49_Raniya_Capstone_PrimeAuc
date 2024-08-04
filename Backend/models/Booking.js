const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  lot_no: {
    type: String,
    required: true,
    ref: 'Auction.items'  // This references the Auction model's items field
  },
  userbid_no: {
    type: String,
    required: true,
    ref: 'User'  // This references the User model
  },
  highest_bid: {
    type: Number,
    required: true
  },
  is_paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true }); // Correct placement of timestamps option

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
