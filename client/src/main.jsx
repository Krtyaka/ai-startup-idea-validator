import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            color: "#e5e7eb",
            border: "1px solid #262626",
            minWidth: "360px",
            maxWidth: "420px",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
