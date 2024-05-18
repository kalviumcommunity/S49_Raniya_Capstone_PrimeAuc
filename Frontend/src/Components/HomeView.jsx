import React, { useState, useEffect, useRef } from "react";
import Imagebox from "./Imagebox";
import background from "../assets/images/background.jpg";
import "../Styles/HomeView.css";
import art from "../assets/images/art.png";
import ant from "../assets/images/ant.png";
import oth from "../assets/images/oth.png";
import acc from "../assets/images/acc.png";
import { CImage } from "@coreui/react";
import s1 from "../assets/images/1.jpg";
import s2 from "../assets/images/2.png";
import s3 from "../assets/images/3.jpg";
import s4 from "../assets/images/4.jpg";
import { Link } from "react-router-dom";

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
      <div
        className="imagemain"
        style={{ backgroundImage: `url(${background})` }}
      >
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

      <div class="clearfix">
        <div class="topheader">
          <h1 class="V1">LOXERA AUCTIONS</h1>
          <Link to="/auctionitemlist">
            <h1 class="V2">VIEW ALL</h1>
          </Link>
        </div>
        <div class="clearfix-container">
          <CImage fluid rounded src={s1} width={300} height={300} />

          <CImage fluid rounded src={s2} width={300} height={200} />

          <CImage fluid rounded src={s3} width={300} height={300} />

          <CImage fluid rounded src={s4} width={300} height={300} />
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
