import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Bidstats() {
  const { lotno } = useParams();

  useEffect(() => {
    updateStatus(lotno, "Closed");
  }, [lotno]);

  const updateStatus = async (lotNo, newStatus) => {
    console.log(newStatus)
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

  return (
    <div>
      <h1>Bid Statistics for Lot {lotno}</h1>
      
    </div>
  );
}

export default Bidstats;
