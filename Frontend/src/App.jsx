import React from "react";
import "./Styles/Header.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeView from "./Components/HomeView";
import Login from "./Components/Login";
import AuctionItemsList from "./Components/AuctionItemsList";
// import Help from "./Components/Help";

const App = () => {
  return (
    <div className="app-wrapper d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login/>} />
          <Route path="/auctionitemlist" element={<AuctionItemsList/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
