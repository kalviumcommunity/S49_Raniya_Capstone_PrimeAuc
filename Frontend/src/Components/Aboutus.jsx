import React from 'react'
import "../Styles/Aboutus.css";
import  { useEffect,useRef } from "react";
import pop from "../assets/animations/pop.json";
import lottie from "lottie-web";

function Aboutus() {


    const lottiecontainer = useRef(null);
  const lottiecontainerRight = useRef(null); // New ref for the animation turned vertically right
  
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottiecontainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: pop // Directly pass the imported JSON file
    });
  
    // Adjust the scale to flip the animation upside down
    lottiecontainer.current.style.transform = 'scaleY(-1)';
  
    const animationRight = lottie.loadAnimation({
      container: lottiecontainerRight.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: pop // Directly pass the imported JSON file
    });
  
    // Adjust the scale to rotate the animation vertically right
    lottiecontainerRight.current.style.transform = 'scaleX(-1)';
  
    return () => {
      animation.destroy(); // Clean up animation when component unmounts
      animationRight.destroy(); // Clean up animation when component unmounts
    };
  }, []);


  return (
    <div>
       <div className="text">
  <div className="pop" ref={lottiecontainer}></div>
  <div className="span1">
  <span className="span2">EVERY MOMENT IS A MASTERPIECE</span></div>

  <h3>
    Welcome to Loxera, your premier destination for the discerning collector and connoisseur. Immerse yourself in a world where artistry and heritage intertwine, where each piece tells a story of timeless elegance and unparalleled craftsmanship.

    At Loxera, we curate a captivating collection of art, antiques, collectibles, accessories, and more, inviting you to explore the depths of history and beauty. <br /><br />Whether you're seeking a masterpiece to adorn your space, a rare artifact to enrich your collection, or an exquisite accessory to elevate your style, Loxera offers an unparalleled selection that caters to the most refined tastes.

    Indulge in the thrill of the auction as you embark on a journey through the ages, where every bid is an opportunity to acquire a piece of history. <br /><br />With our commitment to excellence and authenticity, Loxera ensures that each item in our collection is meticulously vetted and expertly presented, providing you with the assurance of quality and value.

    Discover the allure of the extraordinary at Loxera, where every acquisition is a testament to your discerning taste and appreciation for the finer things in life. Join us in celebrating the art of living beautifully, only at Loxera.
  </h3>

  <div className="popbottom" ref={lottiecontainerRight }></div>
</div> 
    </div>
  )
}

export default Aboutus
