import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CCardImageOverlay,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../Styles/Item.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

function AuctionItemsList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios.get("http://localhost:3000/items").then((res) => {
        setItems(res.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFilter(selectedCategory);
  }, [items, page]);

  const handleFilter = (category) => {
    console.log("calling onload 1st", category, items);
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
      console.log(array, "onload");
      setFilteredItems(array);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setFilteredItems(array.slice(startIndex, endIndex));
    } else {
      console.log("xyz", category, items);

      const filtered = items.find((item) => item.category === category);
      console.log(filtered.items);
      if (filtered) {
        setFilteredItems(filtered.items);
      } else {
        setFilteredItems([]);
      }
    }

    setSelectedCategory(category); // Update selectedCategory state
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="selection-container">
        <select
          value={selectedCategory}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Art">Art</option>
          <option value="Accessories">Accessories</option>
          <option value="Antiques and Collectables">
            Antiques and Collectables
          </option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="card-container">
        {filteredItems.map((item) => (
          console.log(item),
          <CCard className="custom-card">
            <Link to={`/itemdetails/${item.lot_no}`} className="overlay-link"> 
            <CCardImage
              src={item.image}
              alt={item.title}
              className="custom-card-image"
            />

            <CCardImageOverlay className="overlay">
              <CCardTitle className="overlay-text">VIEW DETAILS</CCardTitle>
            </CCardImageOverlay>
            </Link>

            <CCardBody>
              <CCardTitle className="card-title" text-align="center">
                {item.title}
              </CCardTitle>
              <div className="button-container">
                <CButton color="secondary" className="auction-button" href="/">
                  AUCTION
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        ))}
      </div>
      <div className="pagination-container">
        {selectedCategory === "All" && (
          <Stack spacing={2}>
            <Pagination
              count={4}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
            />
          </Stack>
        )}
      </div>
    </div>
  );
}

export default AuctionItemsList;
