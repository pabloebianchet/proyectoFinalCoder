import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Contact from "./components/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AppBarCustom from "./components/AppBarCustom";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <BrowserRouter>
      <AppBarCustom />
      <WhatsAppButton phoneNumber="+541136420582" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductDetail/:productId" element={<ProductDetail />} />
        <Route path="/Contacto" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
