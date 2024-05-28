import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

function Bidstats() {
  const { lotno } = useParams();
  const [lotBids, setLotBids] = useState([]);

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
      const lotBidsData = bidItems.filter(item => item.lot_no === lotNo);
      console.log("All bids:", lotBidsData);

      if (lotBidsData.length > 0) {
        setLotBids(lotBidsData[0].bids);
        console.log("Bids for lot", lotNo, ":", lotBidsData[0].bids);
      } else {
        console.log("No bids found for lot", lotNo);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  return (
    <div >
     
      {lotBids ? <Chart bids={lotBids} style={{ width: '1080px', height: '1080px'}} /> : <p>Loading bids...</p>}

   </div>
  );
}

export default Bidstats;

