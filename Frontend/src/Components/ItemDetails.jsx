import React, { useState, useEffect } from 'react';
import { useParams,Link} from 'react-router-dom';
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
    <div styles={{display:"flex"}} >
    <div >
  <h1>Item Details</h1>
  <h2>{item.title}</h2>

    <img src={item.image} alt={item.title}  style={{width:"300px",height:"300px"}}/>
 
 
  <p>{item.description}</p>
  <Link to={`/bid/${item.lot_no}`} >
    <CButton color="secondary">BID FOR LOT</CButton>
  </Link>

</div>


    </div>

  );
}

export default ItemDetails;
