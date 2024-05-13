import React, { useState, useEffect } from 'react';
import Imagebox from './Imagebox';
import background from  '../assets/images/background.jpg';
import   "../Styles/HomeView.css";

function HomeView() {
  

  // State variables to hold images for different statuses
  const [activeImages, setActiveImages] = useState([]);
  const [closedImages, setClosedImages] = useState([]);
  const [upcomingImages, setUpcomingImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => {
        const itemsArray = data.map(item => item.items).flat();

        // Filter items based on status
        const activeItemsArray = itemsArray.filter(item => item.status === 'Active');
        const closedItemsArray = itemsArray.filter(item => item.status === 'Closed');
        const upcomingItemsArray = itemsArray.filter(item => item.status === 'Upcoming');

        // Extract images and titles for each status
        const activeImagesArray = activeItemsArray.map(item => ({
          title: item.title,
          imgPath: item.image
        }));
        const closedImagesArray = closedItemsArray.map(item => ({
          title: item.title,
          imgPath: item.image
        }));
        const upcomingImagesArray = upcomingItemsArray.map(item => ({
          title:item.title,
          imgPath:item.image 
          
        }));

        // Set state for each status
        setActiveImages(activeImagesArray);
        setClosedImages(closedImagesArray);
        setUpcomingImages(upcomingImagesArray);

        // Set fetchedImages state with formatted images for active items
        setFetchedImages(activeImagesArray.map(item => ({
          label: item.title,
          imgPath: item.imgPath
        })));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const x="LIVE AUCTIONS";
  const y="CLOSED AUCTIONS";
  const z="UPCOMING AUCTIONS";

  return (
    <div>
       <div className="image" style={{ backgroundImage: `url(${background})` }}>
        <h1 className="header1">WHERE BEAUTY MEETS THE EYES OF THE BEHOLDER</h1>
      </div>
   
    
     <div className="imagecarousel">
      <Imagebox images={activeImages} heading={x} />

<Imagebox images={closedImages} heading={y} />

<Imagebox images={upcomingImages} heading={z} /></div>
    </div>
  );
}

export default HomeView;
