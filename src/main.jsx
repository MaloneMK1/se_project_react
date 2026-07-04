import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./vendor/normalize.css";
import "./vendor/fonts.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
