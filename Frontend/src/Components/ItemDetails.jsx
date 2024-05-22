import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CButton } from '@coreui/react';

function ItemDetails() {
  const { lotno } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/itemdetails/${lotno}`);
      setItem(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!item) {
    return <div>LOADING</div>;
  }

  console.log('Item status:', item.status);

  return (
    <div className="biditem-container">
      <div className="item-details">
        <h1 className="item-title">Item Details</h1>
        <h2 className="item-subtitle">{item.title}</h2>
        <div className="item-info">
          <h3>Lot No: {item.lot_no}</h3>
          <h3>Start Time: {item.start_time}</h3>
          <h3>End Time: {item.end_time}</h3>
          <h3>Status: {item.status}</h3>
          <h3>Reserve Price: *******</h3>
          <h3>Starting Price: {item.starting_price}</h3>
        </div>
        <p className="item-description">{item.description}</p>
        <Link to={`/bid/${item.lot_no}`}>
          <button    
            
            className="bid-button" 
            disabled={item.status === 'Closed'||item.status==="Upcoming"}
          >
            BID FOR LOT
          </button>
        </Link>
        {item.status === 'Closed' && (
          <Link to={`/bidstats/${item.lot_no}`}>
            <button  className="stats-button">
              OPEN BID STATS
            </button>
          </Link>
        )}
      </div>
      <div className="item-image-container">
        <img src={item.image} alt={item.title} className="item-image" />
      </div>
    </div>
  );
}

export default ItemDetails;
