import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartTable = () => {
  const { cartItems, removeTotal, addToCart, updateCartItem } = useCart();

  const handleRemove = (productId) => {
    if (productId) {
      removeTotal(productId);
    }
  };

  const handleIncrement = (productId) => {
    addToCart(cartItems.find((item) => item.id === productId));
  };

  const handleDecrement = (productId) => {
    const currentItem = cartItems.find((item) => item.id === productId);
    if (currentItem.quantity > 1) {
      const newQuantity = currentItem.quantity - 1;
      updateCartItem(productId, newQuantity);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <Box mt={20}>
      {cartItems.length === 0 ? (
        <Typography variant="h5" align="center">
          Ups! parece que tu carrito está vacío.
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              marginTop: { xs: 1, md: 5 },
              marginBottom: { xs: 3, md: 6 },
            }}
          >
            <Button
              component={Link}
              to={`/`}
              style={{
                backgroundColor: "#ffffff49",
                marginTop: 20,
                marginBottom: 10,
                border: "solid",
              }}
              sx={{
                width: { xs: "70%", md: "20%" },
                borderRadius: 20,
                marginTop: 5,
                alignItem: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                style={{ padding: 6 }}
              >
                Explorar la tienda
              </Typography>
            </Button>
          </Box>
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>Imagen</TableCell>
                <TableCell style={{ textAlign: "center" }}>Nombre</TableCell>
                <TableCell style={{ textAlign: "center" }}>Precio</TableCell>
                <TableCell style={{ textAlign: "center" }}>Cantidad</TableCell>
                <TableCell style={{ textAlign: "center" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell style={{ textAlign: "center" }}>
                    <img
                      src={item.imageSrc}
                      alt={item.productName}
                      style={{ width: 50 }}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {item.productName}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    $ {item.price}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                    >
                      <Button onClick={() => handleIncrement(item.id)}>
                        +
                      </Button>
                      <Button onClick={() => handleDecrement(item.id)}>
                        -
                      </Button>
                      <IconButton onClick={() => handleRemove(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", fontSize: "larger" }}
                  >
                    Cant. de Productos: {totalQuantity}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", fontSize: "larger" }}
                  >
                    Total de la compra: $ {totalPrice.toFixed(2)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "flex-start", md: "center" },
                      mt: 2,
                      marginTop: { xs: 1, md: 5 },
                      marginBottom: { xs: 3, md: 6 },
                    }}
                  >
                    <Button
                      component={Link}
                      to={{
                        pathname: "/Pagar",
                        state: {
                          cartItems: cartItems,
                          totalQuantity: totalQuantity,
                          totalPrice: totalPrice,
                        },
                      }}
                      style={{
                        backgroundColor: "#ffffff49",
                        marginTop: 50,
                        marginBottom: 10,
                        border: "solid",
                      }}
                      sx={{ width: "30%", borderRadius: 20, marginTop: 5 }}
                    >
                      <Typography
                        variant="body2"
                        color="text.primary"
                        style={{ padding: 6 }}
                      >
                        Ir a Pagar
                      </Typography>
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CartTable;
