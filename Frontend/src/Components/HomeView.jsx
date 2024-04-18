import React from "react";
import background from  '../assets/images/background.jpg';
import b1 from  '../assets/images/1.jpg';
import b2 from  '../assets/images/2.jpg';
import   "../Styles/HomeView.css"; // Import CSS file for styling
import {CCarousel,CCarouselItem,CImage,CCallout} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';


const HomeView = () => {
  return (
    <div>

      <div className="image" style={{ backgroundImage: `url(${background})` }}>
        <h1 className="header1">WHERE BEAUTY MEETS THE EYES OF THE BEHOLDER</h1>
      </div>
   
      <div className="container">
      <CCarousel controls transition="crossfade">
  <CCarouselItem>
    <CImage className="d-block w-100" src={background} alt="slide 1" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={b1} alt="slide 2" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={b2} alt="slide 3" />
  </CCarouselItem>
</CCarousel>
      </div>

      <CCallout color="primary">
  New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background,
  terminology, guidelines, and code snippets.
</CCallout>
   
    </div>
  );
};

export default HomeView;
