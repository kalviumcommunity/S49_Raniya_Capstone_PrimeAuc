import React from 'react';

import  { useState } from 'react';
import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';


function Pay() {
  const [loading, setLoading] = useState(false);

  const stripePromise = loadStripe('pk_test_51PQ9GfJKCr2esqswvQxJou7YoD8ztf4VwLzlvVkIHuZ1ZRs26ezYr0KRzyFDniz3u8MDBia8JMe6DY5CNrmXusAh00DcRAsp0S')  

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/bookings', {
        lot_no: '2024DP002',
        userbid_no: 'Biduser_BD0018',
        highest_bid: 100 // Replace with the actual highest bid amount in INR
      });
  
     if (response.status === 201) {
      const { clientSecret } = response.data;

      // Get Stripe.js instance
      const stripe = await stripePromise;

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId: clientSecret });

      if (error) {
        console.error('Stripe checkout error:', error);
      }
    }
  } catch (error) {
    console.error('Error creating booking:', error);
  } finally {
    setLoading(false);
  }
};
  

  return (


<div>

<button onClick={handleBooking} disabled={loading}>
      {loading ? 'Processing...' : 'Book'}
    </button>



</div>


    
  );
}

export default Pay;