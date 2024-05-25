import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Función para calcular el precio total y la cantidad total
  const calculateTotals = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  };

  // Actualizar totales cuando cambien los elementos del carrito
  useEffect(() => {
    calculateTotals();
  }, [cartItems]); // Dependencia en cartItems

  const addToCart = (product) => {
    setCartCount((prevCount) => prevCount + 1);
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, quantityToRemove = 1) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity - quantityToRemove;
          if (newQuantity <= 0) {
            return null; // Eliminar el elemento de la lista
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean); // Eliminar entradas null
    setCartItems(updatedCartItems);
    setCartCount((prevCount) => prevCount - quantityToRemove); // Actualizar cartCount
  };

  const removeTotal = (productId) => {
    const removedItems = cartItems.filter((item) => item.id === productId);
    const removedQuantity = removedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    setCartCount((prevCount) => prevCount - removedQuantity);
  };

  const updateCartItem = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        totalPrice,
        totalQuantity,
        addToCart,
        removeFromCart,
        removeTotal,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

// Exportar clearCart fuera de la función CartProvider
export const clearCart = () => {
  // Código para limpiar el carrito...
};
