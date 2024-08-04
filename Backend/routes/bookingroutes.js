// routes/bookingRoutes.js

const express = require('express');
const { createBooking } = require('../controllers/bookingcontroller');

const router = express.Router();

// Route for creating a new booking
router.post('/bookings', createBooking);

module.exports = router;
