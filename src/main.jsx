// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./Context";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
