import React from "react";
import "./Styles/Header.css";
import "./App.css";
import Routing from "./Routes";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// import Help from "./Components/Help";

const App = () => {
  localStorage.setItem("userId", "biduser1234"); 
  return (
    <div className="app-wrapper d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Routing/>
      </main>
      <Footer />
    </div>
  );
};

export default App;


{/* <div className="d-flex justify-content-center">
  <CSpinner />
</div> */}



// <div className="container">
//         <CCarousel controls transition="crossfade">
//           <CCarouselItem>
//             <CImage className="d-block w-100" src={background} alt="slide 1" />
//           </CCarouselItem>
//           <CCarouselItem>
//             <CImage className="d-block w-100" src={b1} alt="slide 2" />
//           </CCarouselItem>
//           <CCarouselItem>
//             <CImage className="d-block w-100" src={b2} alt="slide 3" />
//           </CCarouselItem>
//         </CCarousel>
//       </div>

//       <CCallout color="primary">
//         New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background,
//         terminology, guidelines, and code snippets.
//       </CCallout>