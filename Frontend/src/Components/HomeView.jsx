import React from "react";
import background from  '../assets/images/background.jpg';
import   "../Styles/HomeView.css"; // Import CSS file for styling


const HomeView = () => {
  return (
    <div>

      <div className="image" style={{ backgroundImage: `url(${background})` }}>
        <h1 className="header">WHERE BEAUTY MEETS THE EYES OF THE BEHOLDER</h1>
      </div>
   
      <div className="container">
      <p>hello</p>
      </div>
   
    </div>
  );
};

export default HomeView;
