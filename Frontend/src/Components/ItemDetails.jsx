import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Item Details</h1>
      <h2>{item.title}</h2>
      <img src={item.image} alt={item.title} />
      <p>{item.description}</p>
      <CButton color="secondary" >AUCTION</CButton>
    </div>
  );
}

export default ItemDetails;
