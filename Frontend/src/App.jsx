import React from "react";
import "./Styles/Header.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeView from "./Components/HomeView";
import Login from "./Components/Login";
import Sell from "./Components/Sell";
import Help from "./Components/Help";
import AuctionItemsList from "./Components/AuctionItemsList";
import ItemDetails from "./Components/ItemDetails";
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
          <Route path="/sell" element={<Sell/>} />
          <Route path="/help" element={<Help/>} />
          <Route path="/auctionitemlist" element={<AuctionItemsList/>} />
          <Route path="/itemdetails/:lotno" element={<ItemDetails/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
