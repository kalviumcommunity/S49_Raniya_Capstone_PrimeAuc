import React, { useState, useEffect } from "react";
import CountdownTimer from "./Timer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  CModal,
  CModalFooter,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from "@coreui/react";
import "../Styles/Bid.css";

function Bid() {
  const { lotno } = useParams();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [previousBid, setPreviousBid] = useState(0);
  const [visible, setVisible] = useState(false); // Define visible state

  useEffect(() => {
    fetchData();
  }, [lotno]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/itemdetails/${lotno}`
      );
      setItem(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handleQuickBid = () => {
    const newBidAmount = previousBid + 500;
    setBidAmount(newBidAmount.toString());
    setPreviousBid(newBidAmount);
  };

  const handlePlaceBid = async () => {
    const ipAddress = await getIPAddress();
    const userId = localStorage.getItem("userId");
    const timestamp = new Date().toISOString();

    // Construct bid object
    const bid = {
      userbid_no: userId,
      ip_address: ipAddress,
      amount: parseInt(bidAmount), // Convert bidAmount to an integer
      timestamp: timestamp,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/lots/${lotno}/bids`,
        bid
      );
      console.log("Bid placed:", response.data); // Log response after declaration

      setVisible(false); // Close the confirmation modal
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  const getIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };

  return (
    <div>
      <div className="terms">
        <Link to="/auction-terms" className="link11">
          Click here for auction terms and conditions
        </Link>
      </div>
      <CountdownTimer lotno={lotno} />
      <div className="bid-container">
        <div className="details">
          {item && (
            <div>
              <img src={item.image} alt={item.title} />
              <h2>TITLE: {item.title}</h2>
              <p>LOT NO: {item.lot_no}</p>
              <p>RESERVE PRICE: ***** </p>
              <p>START TIME: {item.end_time}</p>
              <p>END TIME: {item.start_time}</p>
            </div>
          )}
        </div>

        <div className="bid-form">
          <h3>Bid Form</h3>
          <input
            type="number"
            value={bidAmount}
            onChange={handleBidChange}
            placeholder="Enter bid amount"
          />
          <button onClick={handleQuickBid}>Quick Bid</button>

          <CButton
            color="primary"
            onClick={() => setVisible(true)} // Show the confirmation modal
            disabled={!bidAmount}
          >
            PLACE BID
          </CButton>

          <CModal
            backdrop="static"
            visible={visible} // Control visibility of the modal
            onClose={() => setVisible(false)}
            aria-labelledby="StaticBackdropExampleLabel"
          >
            <CModalHeader>
              <CModalTitle id="StaticBackdropExampleLabel">
                BID CONFIRMATION
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              DO YOU WANT TO PLACE BID OF ₹{bidAmount} FOR THIS LOT?
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                CANCEL
              </CButton>
              <CButton color="primary" onClick={handlePlaceBid}>
                CONFIRM
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
    </div>
  );
}

export default Bid;