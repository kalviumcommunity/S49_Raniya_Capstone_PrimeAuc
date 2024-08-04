import React from 'react';
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from "@coreui/react";
import "../Styles/Help.css";

import  { useState } from 'react';
import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';


function Help() {
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


<div className='faq'>
<h2>Frequently Asked Questions</h2>
<CAccordion flush>
  <CAccordionItem itemKey={1}>
    <CAccordionHeader>What is the minimum bid increment?</CAccordionHeader>
    <CAccordionBody>The minimum bid increment is ₹100.</CAccordionBody>
  </CAccordionItem>
  <CAccordionItem itemKey={2}>
    <CAccordionHeader>Can I retract my bid?</CAccordionHeader>
    <CAccordionBody>No, you cannot retract your bid once it has been placed.</CAccordionBody>
  </CAccordionItem>
  <CAccordionItem itemKey={3}>
    <CAccordionHeader>What happens if there is a tie bid?</CAccordionHeader>
    <CAccordionBody>In the event of a tie bid, the bidder with the earliest timestamp will win the auction.</CAccordionBody>
  </CAccordionItem>
</CAccordion>


<button onClick={handleBooking} disabled={loading}>
      {loading ? 'Processing...' : 'Book'}
    </button>



</div>


    
  );
}

export default Help;
