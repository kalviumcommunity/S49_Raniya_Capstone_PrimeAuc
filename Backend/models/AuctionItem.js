const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    title: String,
    description: String,
    lot_no: {
        type: String,
        required: true,
        unique: true, // Added unique constraint
      },
    image: String,
    reserve_price: String,
    start_time: String,
    end_time: String,
    status: String,
    starting_price: String
});

const auctionSchema = new Schema({
    category: String,
    items: [itemSchema]
});

const Auction = mongoose.model('data', auctionSchema);

module.exports = Auction;
