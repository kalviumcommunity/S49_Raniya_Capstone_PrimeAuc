import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import {NextUIProvider} from "@nextui-org/react";

ReactDOM.render(
  <React.StrictMode>
    {/* <NextUIProvider> */}
    <BrowserRouter>
   
      <App />
    </BrowserRouter>
    {/* </NextUIProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
