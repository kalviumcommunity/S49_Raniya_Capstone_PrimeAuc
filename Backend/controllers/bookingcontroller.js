const Booking = require('../models/Booking.js');
const {UserModel}  = require('../models/User.js');
const Auction = require('../models/AuctionItem.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createBooking = async (req, res) => {
  const { lot_no, userbid_no, highest_bid } = req.body;

  try {
    const user = await UserModel.findOne({ userbid_no });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const auction = await Auction.findOne({ 'items.lot_no': lot_no });
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    const item = auction.items.find(item => item.lot_no === lot_no);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SIDE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get('host')}/auctions/${auction._id}`,
      customer_email: user.email,
      client_reference_id: userbid_no,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: highest_bid * 100,
            product_data: {
              name: item.title,
              description: item.description,
              images: [item.image]
            }
          },
          quantity: 1
        }
      ]
    });

    const newBooking = new Booking({
      lot_no,
      userbid_no,
      highest_bid,
      is_paid: false,
      status: 'pending'
    });

    await newBooking.save();

    res.status(201).json({
      booking: newBooking,
      clientSecret: session.id // Corrected this to session.id
    });
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createBooking,
};
