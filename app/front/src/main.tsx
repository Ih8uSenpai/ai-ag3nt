import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./widgets/theme-provider/index.ts";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <div
        className="circle"
        style={{ top: -50, left: -200, zIndex: -1, scale: 1.5 }}
      />
      <div
        className="circle"
        style={{ bottom: 50, right: -50, zIndex: -1, scale: 2 }}
      />
      <App />
    </ThemeProvider>
  </StrictMode>
);
