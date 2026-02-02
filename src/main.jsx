import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import "./styles/fonts.css";
import Routing from "./routes/Routing.jsx";
import { ensureSeed } from "./data/storage.js";

ensureSeed();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
