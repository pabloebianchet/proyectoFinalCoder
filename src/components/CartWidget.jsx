import { useCart } from "../context/CartContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const CartWidget = () => {
  const { cartItems } = useCart();

  // Calcula la cantidad total de productos sumando las cantidades de todos los productos en el carrito
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <ShoppingCartOutlinedIcon style={{ color: "#000000" }} />
      <div className="cart-widget">
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count" style={{ color: "#000000" }}>
          {totalQuantity}
        </span>
      </div>
    </>
  );
};

export default CartWidget;
