import React, { useState, useEffect, useRef } from "react";
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

import lottie from "lottie-web";
import ToastComponent from "./Toast";
import Chart from "./Chart";
import ImageCover from "./Image";
import load from "../assets/load.json";
function Bid() {
  const { lotno } = useParams();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [countdownEnded, setCountdownEnded] = useState(false); // State to track if countdown has ended

  const [visible, setVisible] = useState(false);
  const [bidConfirmed, setBidConfirmed] = useState(false); // State to track bid confirmation
  const [latestBid, setLatestBid] = useState(1);
  const [allBids, setAllBids] = useState([]); // State to store all bids

  const [visibleA, setVisibleA] = useState(false);
  const [activeTab, setActiveTab] = useState("graph");

  const lottieContainer = useRef(null);
  useEffect(() => {
    if (!latestBid) {
      const animation = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: load,
      });

    
    }
  }, [latestBid]);

  useEffect(() => {
    fetchLatestBid();
    fetchData();
  }, [lotno]);

  useEffect(() => {
    if (bidConfirmed) {
      const timeout = setTimeout(() => {
        setBidConfirmed(false);
      }, 1800);
      return () => clearTimeout(timeout);
    }
  }, [bidConfirmed]);

  async function fetchLatestBid() {
    try {
      const response = await axios.get("http://localhost:3000/biditems");
      const lot = response.data.find((item) => item.lot_no === lotno);
      if (lot && lot.bids.length > 0) {
        const sortedBids = lot.bids.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const latestBid = sortedBids[0];
        setLatestBid(latestBid);
        setAllBids(sortedBids);
      } else {
        setLatestBid(null);
        setAllBids([]);
        console.error(
          `Lot with lot number ${lotno} not found or no bids available.`
        );
      }
    } catch (error) {
      console.error("Error fetching bid information:", error);
    }
  }
  async function updateItemStatus() {
    try {
      const response = await axios.put(`http://localhost:3000/itemdetails/${lotno}`, {
        status: "Closed",
      });
      console.log("Item status updated:", response.data);
      fetchData(); // Fetch the updated item details
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  }
  
  // console.log(allBids,"allbids")
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/itemdetails/${lotno}`
      );
      setItem(response.data);
      console.log(response.data)
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
    <>
      <div className="terms">
  <Link to="/auction-terms" className="marquee">
    Click here for auction terms and conditions
  </Link>
</div>
            <div className="auction-container">
      <div className="column">
        {item && item.status !== "upcoming" && item.status !== "Upcoming" ? (
          <CountdownTimer lotno={lotno} onCountdownEnded={() => { setCountdownEnded(true); updateItemStatus(); }} />
        ) : (
          <p>upcoming auction</p>
        )}
        <div className="details">
          {item && <ImageCover item={item} />}
        </div>
        <button className="top-right-button" onClick={() => setVisibleA(true)}>Open Bid Stats</button>
      </div>

      <div className="column">
        {latestBid ? (
          <div className="latestbid">
            <h1>Latest Bid ₹{latestBid.amount}</h1>
          </div>
        ) : (
          <div ref={lottieContainer} className="lottieContainer" style={{ width: "100px", height: "100px" }}></div>
        )}
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
        </div>
      </div>

      <div className="column">
        <div className="chatbox-bids">
          {allBids.map((bid, index) => (
            <div className="bid" key={index}>
              <h4 className="user">{bid.userbid_no}</h4>
              <p className="amount">₹{bid.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
            {/* Custom Modal */}
            {visibleA && (
              <div className="custom-modal-overlay">
                <div className="custom-modal">
                  <div className="custom-modal-header">
                    <h2>Bid Stats</h2>
                    <button
                      onClick={() => setVisibleA(false)}
                      className="close-button"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="custom-modal-body">
                    <div className="tab-container">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === "graph" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("graph")}
                          >
                            Graph
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            className={`nav-link ${
                              activeTab === "table" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("table")}
                          >
                            Table
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content">
                        {activeTab === "graph" && (
                          <div className="tab-pane active">
                            <Chart bids={allBids} />
                          </div>
                        )}
                        {activeTab === "table" && (
                          <div className="tab-pane active">
                            <table className="zebra-table">
                              <thead>
                                <tr>
                                  <th>Bid Number</th>
                                  <th>Amount</th>
                                  <th>User</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allBids.slice().map((bid, index) => (
                                  <tr key={index}>
                                    <td>{allBids.length - index}</td>
                                    <td>₹{bid.amount}</td>
                                    <td>{bid.userbid_no}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
       

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



              {/* </div> */}


      {bidConfirmed && <ToastComponent bidAmount={bidAmount} />} {/* Render the toast when bid is confirmed */}



    </>
  );
}

export default Bid;
