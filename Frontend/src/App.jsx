import React from "react";
import "./Styles/Header.css";
import "./App.css";
import Routing from "./Routes";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


const App = () => {
  
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

