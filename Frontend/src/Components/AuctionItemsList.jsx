import React, { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
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
import live from "../assets/animations/live.json";

function AuctionItemsList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const lottieContainers = useRef([]);
  const animationInstances = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFilter(selectedCategory);
  }, [items, page]);

  const handleFilter = (category) => {
    let array = [];
    if (category === "All") {
      let x = items.map((item) => item.items);

      x.forEach((item) => {
        item.forEach((elem) => {
          array.push(elem);
        });
      });

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setFilteredItems(array.slice(startIndex, endIndex));
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    // Clear previous animation instances
    animationInstances.current.forEach((instance) => instance.destroy());
    animationInstances.current = [];

    lottieContainers.current.forEach((container, index) => {
      if (container && container.dataset.active === "true") {
        const instance = lottie.loadAnimation({
          container: container,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: live,
        });
        animationInstances.current[index] = instance;
      }
    });

    // Cleanup function to destroy animation instances when component unmounts
    return () => {
      animationInstances.current.forEach((instance) => instance.destroy());
    };
  }, [filteredItems]);


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
        {filteredItems.map((item, index) => (
          <CCard className="custom-card" key={item.lot_no}>
            <Link to={`/itemdetails/${item.lot_no}`} className="overlay-link">
              <CCardImage
                src={item.image}
                alt={item.title}
                className="custom-card-image"
              />
              <CCardImageOverlay className="overlay">
                <CCardTitle className="overlay-text">VIEW DETAILS</CCardTitle>
                {item.status === "Active" && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className="lottieContainer"
                      style={{ width: "10%", height: "10%", zIndex: 999 }}
                      ref={(el) => (lottieContainers.current[index] = el)}
                      data-active="true"
                    ></div>
                    <div>
                      <h1 className="live">LIVE</h1>
                    </div>
                  </div>
                )}


{item.status==="Closed" && (
                  
                    <div>
                      <h1 className="live">CLOSED</h1>
                    </div>
                  
                )}
                
{item.status==="Upcoming" && (
                  
                  <div>
                    <h1 className="live">UPCOMING</h1>
                  </div>
                
              )}
              </CCardImageOverlay>
            </Link>
            <CCardBody>
              <CCardTitle className="card-title" text-align="center">
                {item.title}
              </CCardTitle>
              <div className="button-container">
                <Link to={`/itemdetails/${item.lot_no}`}>
                  <CButton color="secondary" className="auction-button">
                    BID FOR LOT
                  </CButton>
                </Link>
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
