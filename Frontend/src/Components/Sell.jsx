import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CImage, CCarousel, CCarouselItem } from "@coreui/react";
import lottie from "lottie-web";
import sellbackground from "../assets/images/sellbackground.jpg";
import art from "../assets/images/art.png";
import acc from "../assets/images/acc.png";
import oth from "../assets/images/oth.png";
import ant from "../assets/images/ant.png";
import s1 from "../assets/animations/s1.json";
import s2 from "../assets/animations/s2.json";
import s3 from "../assets/animations/s3.json";
import s4 from "../assets/animations/s4.json";
import s5 from "../assets/animations/s5.json";
import s6 from "../assets/animations/s6.json";
import "../Styles/Sell.css";

function Sell() {
  const lottieContainers = useRef([]);

  useEffect(() => {
    const animations = [
      s1, s2, s3, s4, s5, s6
    ];

    const animationInstances = animations.map((animationData, index) => {
      return lottie.loadAnimation({
        container: lottieContainers.current[index],
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData
      });
    });

    // Cleanup function
    return () => {
      // Clean up animation instances
      animationInstances.forEach(instance => instance.destroy());
    };
  }, []);

  return (
    <div>
      <div
        className="imagemain"
        style={{ backgroundImage: `url(${sellbackground})` }}
      >
        <h1 className="header1">
          SELL AT LOXERA, WHERE OPPORTUNITIES MEET ENTHUSIASTS!
        </h1>
      </div>
      <div>
        <div className="grid-container">
          <div>
            <h3>
              Whether you're a seasoned seller or a newcomer to the world of
              online auctions, our platform offers you the perfect stage to
              showcase your treasures and connect with eager buyers from around
              the globe. Set your desired prices, and engage in dynamic bidding
              wars that drive excitement and value. Join our vibrant community
              of sellers today and unlock the potential to turn your items into
              cash while delighting buyers with unique finds.
            </h3>
          </div>
          <Link to="/sell/Listitem">List Item At LOXERA</Link>
        </div>
      </div>
      <div className="container">
        <CCarousel controls transition="crossfade">
          <CCarouselItem>
            <CImage className="d-block w-100" src={acc} alt="slide 1" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={ant} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={art} alt="slide 3" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={oth} alt="slide 4" />
          </CCarouselItem>
        </CCarousel>
      </div>
<div className="container2">
  <h1  className="header2">SELLING GUIDE : <br />HOW TO LIST AN ITEM AT LOXERA</h1>
  
      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="step-box grey-bg">
            <h2>CHOOSE CATEGORY</h2>
            <p>
              Select one from
              <span  className="highlight">
                {" "}
                Art, Antiques and Collectibles, Others, or Accessories.
              </span >{" "}
              <div className="lottiecontainer" ref={(el) => lottieContainers.current[4] = el}></div>
            </p>
           
          </div>
        </div>
        <div class="col-md-6">
          <div class="step-box gold-bg">
            <h2>PROVIDE DETAILS</h2>
            <p>Provide detailed information about the item you're listing.</p> <div className="lottiecontainer" ref={(el) => lottieContainers.current[0] = el}></div>
            
          </div>
        </div>
      </div>
      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="step-box gold-bg">
            <h2>SET TIME</h2>
            <p>
              Set the time for the auction.{" "}
              <span  className="highlight">
                {" "}
                End time should be at least 24 hours after the start time
              </span >{" "}
            </p>
            <div className="lottiecontainer" ref={(el) => lottieContainers.current[2] = el}></div>
            
          </div>
        </div>
        <div class="col-md-6">
          <div class="step-box grey-bg">
            <h2>SET RESERVE PRICE</h2>
            <p>
              Input the minimum price you're willing to accept for the item
              <span  className="highlight"> Starting price should be 25% of the reserve price.</span >
            </p>
            <div className="lottiecontainer" ref={(el) => lottieContainers.current[1] = el}></div>
          
          </div>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="step-box grey-bg">
            <h2>UPLOAD IMAGE</h2>
            <p>Upload a clear image of the item you're listing.</p>
            <div className="lottiecontainer" ref={(el) => lottieContainers.current[5] = el}></div>
          
          </div>
        </div>
        <div class="col-md-6">
          <div class="step-box gold-bg">
            <h2>REVIEW AND SUBMIT</h2>
            <p>Double-check all details and submit your listing for auction.</p>
            <div className="lottiecontainer" ref={(el) => lottieContainers.current[3] = el}></div>
            
          </div>
        </div>
      </div>

      </div>




    </div>
  );
}

export default Sell;
