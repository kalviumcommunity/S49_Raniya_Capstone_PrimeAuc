import React from 'react';
import "../Styles/Checkout.css";
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Checkout() {
  return (
    <div className="payment-success-container">
      <h2 className="success-title">
        Payment Successful&nbsp;
        <FaCheckCircle className="success-icon" color="green" size={24} />
      </h2>
      <p className="success-message">Your payment has been processed successfully.</p>
      <Link to="/auctionitemlist">
        <button className="success-button">Bid for other Items</button>
      </Link>
    </div>
  );
}

export default Checkout;
