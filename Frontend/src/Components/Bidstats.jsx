import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bidstats() {
  const { lotno } = useParams();

  useEffect(() => {
    checkAndUpdateStatus(lotno, "Closed");
    fetchBids(lotno);
  }, [lotno]);

  const checkAndUpdateStatus = async (lotNo, newStatus) => {
    try {
      const response = await axios.get(`http://localhost:3000/itemdetails/${lotNo}`);
      const currentStatus = response.data.status;

      if (currentStatus !== newStatus) {
        updateStatus(lotNo, newStatus);
      } else {
        console.log(`Status is already ${newStatus}`);
      }
    } catch (error) {
      console.error("Error fetching current status:", error);
    }
  };

  const updateStatus = async (lotNo, newStatus) => {
    try {
      const response = await axios.put("http://localhost:3000/items", {
        lot_no: lotNo,
        status: newStatus,
      });
      console.log("Status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const fetchBids = async (lotNo) => {
    try {
      const response = await axios.get("http://localhost:3000/biditems");
      const bidItems = response.data;
      const lotBids = bidItems.filter(item => item.lot_no === lotNo);

      if (lotBids.length > 0) {
        console.log("Bids for lot", lotNo, ":", lotBids[0].bids);
      } else {
        console.log("No bids found for lot", lotNo);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  return (
    <div>
      <h1>Bid Statistics for Lot {lotno}</h1>
    </div>
  );
}

export default Bidstats;
