import React, { useState, useEffect } from "react";
import Imagebox from "./Imagebox";
import background from "../assets/images/background.jpg";
import "../Styles/HomeView.css";
import art from "../assets/images/art.png";
import ant from "../assets/images/ant.png";
import oth from "../assets/images/oth.png";
import acc from "../assets/images/acc.png";
function HomeView() {
  // State variables to hold images for different statuses
  const [activeImages, setActiveImages] = useState([]);
  const [closedImages, setClosedImages] = useState([]);
  const [upcomingImages, setUpcomingImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => {
        const itemsArray = data.map((item) => item.items).flat();

        // Filter items based on status
        const activeItemsArray = itemsArray.filter(
          (item) => item.status === "Active"
        );
        const closedItemsArray = itemsArray.filter(
          (item) => item.status === "Closed"
        );
        const upcomingItemsArray = itemsArray.filter(
          (item) => item.status === "Upcoming"
        );

        // Extract images and titles for each status
        const activeImagesArray = activeItemsArray.map((item) => ({
          lot_no: item.lot_no,
          imgPath: item.image,
        }));
        const closedImagesArray = closedItemsArray.map((item) => ({
          lot_no: item.lot_no,
          imgPath: item.image,
        }));
        const upcomingImagesArray = upcomingItemsArray.map((item) => ({
          lot_no: item.lot_no,
          imgPath: item.image,
        }));

        // console.log(activeImagesArray,closedImagesArray,upcomingImagesArray)

        // Set state for each status
        setActiveImages(activeImagesArray);
        setClosedImages(closedImagesArray);
        setUpcomingImages(upcomingImagesArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const x = "LIVE AUCTIONS";
  const y = "CLOSED AUCTIONS";
  const z = "UPCOMING AUCTIONS";

  return (
    <div>
      <div className="image" style={{ backgroundImage: `url(${background})` }}>
        <h1 className="header1">WHERE BEAUTY MEETS THE EYES OF THE BEHOLDER</h1>
      </div>

      <div className="imagecarousel">
  <div className="imagebox-container">
    <Imagebox images={activeImages} heading={x} />
  </div>

  <div className="imagebox-container">
    <Imagebox images={closedImages} heading={y} />
  </div>

  <div className="imagebox-container">
    <Imagebox images={upcomingImages} heading={z} />
  </div>
</div>


<div className="art">
  <img src={art} alt="f" />
  
</div>
<div className="acc">
 
  <img src={acc} alt="" />
</div>
<div className="ant">
 
  <img src={ant} alt="" />
</div>
<div className="oth">
 
  <img src={oth} alt="" />
</div>


    </div>
  );
}

export default HomeView;
