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
  COffcanvas,
  COffcanvasHeader,
  COffcanvasBody,
  COffcanvasTitle,
  CCloseButton,
} from "@coreui/react";
import "../Styles/Bid.css";

import ToastComponent from "./Toast";
import Chart from "./Chart";
import ImageCover from "./Image";
function Bid() {
  const { lotno } = useParams();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [countdownEnded, setCountdownEnded] = useState(false); // State to track if countdown has ended

  const [visible, setVisible] = useState(false);
  const [bidConfirmed, setBidConfirmed] = useState(false); // State to track bid confirmation
  const [latestBid, setLatestBid] = useState(0);
  const [allBids, setAllBids] = useState([]); // State to store all bids

  const [visibleA, setVisibleA] = useState(false);

  useEffect(() => {
    fetchLatestBid();

    fetchData();
  }, [lotno]);

  useEffect(() => {
    if (bidConfirmed) {
      const timeout = setTimeout(() => {
        setBidConfirmed(false);
      }, 1800); // Reset bidConfirmed to false after 3 seconds
      return () => clearTimeout(timeout); // Cleanup function to clear timeout
    }
  }, [bidConfirmed]);

  async function fetchLatestBid() {
    try {
      const response = await axios.get("http://localhost:3000/biditems");
      const lot = response.data.find((item) => item.lot_no === lotno);
      if (lot) {
        const sortedBids = lot.bids.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const latestBid = sortedBids[0];
        setLatestBid(latestBid);
        setAllBids(sortedBids); // Update allBids state with all bids
      } else {
        console.error(`Lot with lot number ${lotno} not found.`);
      }
    } catch (error) {
      console.error("Error fetching bid information:", error);
    }
  }

  // console.log(allBids,"allbids")
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
    if (!latestBid) {
      setBidAmount("500");
    } else {
      const newBidAmount = latestBid.amount + 500;
      setBidAmount(newBidAmount.toString());
    }
  };

  const handlePlaceBid = async () => {
    const ipAddress = await getIPAddress();
    const userId = localStorage.getItem("userId");
    const timestamp = new Date().toISOString();

    // Check if bid amount meets the increment requirement
    if (parseInt(bidAmount) < parseInt(latestBid.amount) + 500) {
      alert("Bid should be at least 500 higher than the current bid.");
      return; // Stop further execution
    }

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
      setBidConfirmed(true); // Set bid confirmation to true after successful bid placement
      console.log("Bid placed:", response.data);
      setVisible(false);
      // Fetch latest bid data after successfully placing the bid
      fetchLatestBid(); // Call the fetchLatestBid function again
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

      <div className="parent-container">
      {latestBid ? (
        <div className="latestbid">
          <h1>
            CURRENT BID {latestBid.amount} BY {latestBid.userbid_no}
          </h1>
        </div>
      ) : (
        <p className="latestbid">UPCOMING AUCTION</p>
      )}
      <div className="bid-container">
        <CountdownTimer lotno={lotno} onCountdownEnded={setCountdownEnded} />
        <div className="details">
          {item && (
            <div>
              <ImageCover item={item} />
            </div>
          )}
        </div>
      </div>
   




        <div className="bid-form">
          <h3>Bid Form</h3>
          <input
            type="number"
            value={bidAmount}
            onChange={handleBidChange}
            placeholder="Enter bid amount"
            disabled={countdownEnded}
          />
          <button onClick={handleQuickBid} disabled={countdownEnded}>
            Quick Bid
          </button>

          <CButton
            color="primary"
            onClick={() => setVisible(true)}
            disabled={!bidAmount || countdownEnded}
          >
            PLACE BID
          </CButton>

          <div className="chatbox-bids">
            {allBids.map((bid, index) => (
              <div className="bid" key={index}>
                <h4 className="user">{bid.userbid_no}</h4>
                <p className="amount">₹{bid.amount}</p>
              </div>
            ))}
          </div>

          <CButton color="primary" onClick={() => setVisibleA(true)}>
            GRAPH
          </CButton>
          <COffcanvas
            placement="bottom"
            scroll={true}
            visible={visibleA}
            onHide={() => setVisibleA(false)}
          >
            <COffcanvasHeader>
              <COffcanvasTitle>BID HISTORY LINE GRAPH DETAILS</COffcanvasTitle>
              <CCloseButton
                placement="end"
                className="text-reset"
                onClick={() => setVisibleA(false)}
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              <Chart bids={allBids} />
            </COffcanvasBody>
          </COffcanvas>

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
              <CButton color="primary" onClick={handlePlaceBid}>
                CONFIRM
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </div>
      {bidConfirmed && <ToastComponent bidAmount={bidAmount} />}{" "}
      {/* Render the toast when bid is confirmed */}
    </div>
  );
}

export default Bid;
