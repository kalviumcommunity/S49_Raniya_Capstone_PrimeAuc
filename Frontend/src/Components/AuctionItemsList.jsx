import React, { useState, useEffect } from "react";
import axios from "axios";

function AuctionItemsList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/items");
      setItems(response.data);
      handleFilter("All"); // Call handleFilter with "All" when items are fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilter = (category) => {
    let array = [];
    if (category === "All") {
      let x = items.map((item) => {
        return item.items;
      });

      x.map((item) => {
        item.map((elem) => {
          array.push(elem);
        });
      });
      setFilteredItems(array);
    } else {
      const filtered = items.find((item) => item.category === category);
      if (filtered) {
        setFilteredItems(filtered.items);
      } else {
        setFilteredItems([]);
      }
    }
    setSelectedCategory(category); // Update selectedCategory state
  };

  return (
    <div>
      <select value={selectedCategory} onChange={(e) => handleFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Art">Art</option>
        <option value="Accessories">Accessories</option>
        <option value="Antiques and Collectables">Antiques and Collectables</option>
        <option value="Others">Others</option>
      </select>

      <div>
        {filteredItems.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title}/>
            <p>{item.description}</p>
            <p>Lot Number: {item.lot_no}</p>
            <p>Reserve Price: {item.reserve_price}</p>
            <p>Start Time: {item.start_time}</p>
            <p>End Time: {item.end_time}</p>
            <p>Status: {item.status}</p>
            <p>Starting Price: {item.starting_price}</p>
           
      </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionItemsList;
