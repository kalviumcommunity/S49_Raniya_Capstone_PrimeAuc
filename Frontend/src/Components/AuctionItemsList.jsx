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
             await axios.get("http://localhost:3000/items").then((res)=>{
        setItems(res.data);
      })
     
     
      // console.log(items,"inside fetch",response.data)
   
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
     handleFilter("All")
  },[items])

  const handleFilter = (category) => {
    console.log("calling onload 1st",category,items)
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
      console.log(array,"onload")
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
      </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionItemsList;
