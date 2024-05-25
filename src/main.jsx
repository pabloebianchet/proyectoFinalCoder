import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import App from "./App";

// Define el tema con la fuente Nunito
const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </React.StrictMode>
  </ThemeProvider>
);
