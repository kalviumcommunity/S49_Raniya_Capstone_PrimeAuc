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
} from "@coreui/react"; // Import the Modal component
import "../Styles/Bid.css";

function Bid() {
  const { lotno } = useParams();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [previousBid, setPreviousBid] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [lotno]); // Fetch data whenever lotno changes

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/itemdetails/${lotno}`
      );
      setItem(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handleQuickBid = () => {
    // Increment the bid amount by 500 from the previous bid
    const newBidAmount = previousBid + 500;
    setBidAmount(newBidAmount.toString());
    setPreviousBid(newBidAmount);
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
            onClick={() => setVisible(!visible)}
            disabled={!bidAmount} // Disable the button if bidAmount is empty
          >
            PLACE BID
          </CButton>


          <CModal
            backdrop="static"
            visible={visible}
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
              <CButton color="primary">CONFIRM</CButton>
            </CModalFooter>
          </CModal>
        </div>



       
      </div>
    </div>
  );
}

export default Bid;