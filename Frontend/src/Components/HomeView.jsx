import React, { useState, useEffect } from "react";
import Imagebox from "./Imagebox";
import background from "../assets/images/background.jpg";
import "../Styles/HomeView.css";

function HomeView() {
  // State variables to hold images for different statuses
  const [activeImages, setActiveImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => {
        const itemsArray = data.map((item) => item.items).flat();

        // Filter items based on status
        const activeItemsArray = itemsArray.filter(
          (item) => item.status === "Active"
        );

        // Extract images and titles for each status
        const activeImagesArray = activeItemsArray.map((item) => ({
          title: item.title,
          imgPath: item.image,
        }));

        // Set state for each status
        setActiveImages(activeImagesArray);

        // Set fetchedImages state with formatted images for active items
        setFetchedImages(
          activeImagesArray.map((item) => ({
            label: item.title,
            imgPath: item.imgPath,
          }))
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const x = "LIVE AUCTIONS";

  return (
    <div>
      <div
        className="imagemain"
        style={{ backgroundImage: `url(${background})` }}
      >
        <h1 className="header1">WHERE BEAUTY MEETS THE EYES OF THE BEHOLDER</h1>
      </div>

      <div>
        <Imagebox images={activeImages} heading={x} />
      </div>
    </div>
  );
}

export default HomeView;
