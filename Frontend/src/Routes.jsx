import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomeView from "./Components/HomeView";
import Login from "./Components/Login";
import Sell from "./Components/Sell";
import Help from "./Components/Help";
import AuctionItemsList from "./Components/AuctionItemsList";
import ItemDetails from "./Components/ItemDetails";
import Listitem from "./Components/Listitem";
import Bid from "./Components/Bid";

function Routing() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login/>} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/help" element={<Help/>} />
          <Route path="/auctionitemlist" element={<AuctionItemsList/>} />
          <Route path="/itemdetails/:lotno" element={<ItemDetails/>} />
          <Route path="/sell/listitem" element={<Listitem/>} />
          <Route path="/bid/:lotno" element={<Bid/>} />

        </Routes>
    </div>
  )
}

export default Routing;
