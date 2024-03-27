import React from "react";
import "./Styles/Header.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeView from "./Components/HomeView";
// import About from "./Components/About";
// import Help from "./Components/Help";

const App = () => {
  return (
    <div className="app-wrapper d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<HomeView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
