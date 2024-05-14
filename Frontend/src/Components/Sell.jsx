import React from "react";
import sellbackground from "../assets/images/sellbackground.jpg";
import art from "../assets/images/art.png";
import acc from "../assets/images/acc.png";
import oth from "../assets/images/oth.png";
import ant from "../assets/images/ant.png";
import { Link } from "react-router-dom";
import { CImage, CCarousel, CCarouselItem } from "@coreui/react";
import "../Styles/Sell.css";

function Sell() {
  return (
    <div>
      <div
        className="image"
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
          <Link to="/Listitem">List Item At LOXERA</Link>
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
  <h1  className="header2">SELLING GUIDE : HOW TO LIST AN ITEM AT LOXERA</h1>
      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="step-box grey-bg">
            <h2>CHOOSE CATEGORY</h2>
            <p>
              Select one from
              <span>
                {" "}
                Art, Antiques and Collectibles, Others, or Accessories.
              </span>{" "}
            </p>
            <Link to="/Listitem">
              <button class="btn btn-outline-light" type="button">
                Choose Category
              </button>
            </Link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="step-box gold-bg">
            <h2>UPLOAD DETAILS</h2>
            <p>Provide detailed information about the item you're listing.</p>
            <Link to="/Listitem">
              <button class="btn btn-outline-light" type="button">
                Upload Details
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="step-box gold-bg">
            <h2>SET TIME</h2>
            <p>
              Set the starting and ending time for the auction.{" "}
              <span>
                {" "}
                End time should be at least 24 hours after the start time
              </span>{" "}
            </p>
            <Link to="/Listitem">
              <button class="btn btn-outline-light" type="button">
                Set Time
              </button>
            </Link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="step-box grey-bg">
            <h2>SET RESERVE PRICE</h2>
            <p>
              Input the minimum price you're willing to accept for the item
              <span> Starting price should be 25% of the reserve price.</span>
            </p>
            <Link to="/Listitem">
              <button class="btn btn-outline-light" type="button">
                Set Reserve Price
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="step-box grey-bg">
            <h2>UPLOAD IMAGE</h2>
            <p>Upload a clear image of the item you're listing.</p>
            <Link to="/Listitem">
              {" "}
              <button class="btn btn-outline-light" type="button">
                Upload Image
              </button>
            </Link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="step-box gold-bg">
            <h2>REVIEW AND SUBMIT</h2>
            <p>Double-check all details and submit your listing for auction.</p>
            <Link to="/Listitem">
              <button class="btn btn-outline-light" type="button">
                Review and Submit
              </button>
            </Link>
          </div>
        </div>
      </div>

      </div>




    </div>
  );
}

export default Sell;
