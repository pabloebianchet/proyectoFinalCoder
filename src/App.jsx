import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Contact from "./components/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AppBarCustom from "./components/AppBarCustom";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CartTable from "./components/CartTable";
import CheckOut from "./components/CheckOut";
import OrdersTable from "./components/ordersTable";
import SubscribersTable from "./components/SubscribersTable";

function App() {
  return (
    <BrowserRouter>
      <AppBarCustom />
      <WhatsAppButton phoneNumber="+541136420582" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductDetail/:productId" element={<ProductDetail />} />
        <Route path="/Contacto" element={<Contact />} />
        <Route path="/Carrito" element={<CartTable />} />
        <Route path="/Pagar" element={<CheckOut />} />
        <Route path="/Ordenes" element={<OrdersTable />} />
        <Route path="/Suscriptores" element={<SubscribersTable />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
