import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Routing from "./routes/Routing.jsx";
import { ensureSeed } from "./data/storage.js";

ensureSeed();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
