import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCart, clearCart } from "../context/CartContext";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { jsPDF } from "jspdf"; // Importa jsPDF

const handleCloseDialog = () => {
  setDialogOpen(false);
  clearCart(); // Llama a clearCart desde el contexto
};

const CheckOut = () => {
  const { cartItems, totalQuantity, totalPrice } = useCart();
  const [installments, setInstallments] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    routingNumber: "",
  });

  const [buyerDetails, setBuyerDetails] = useState({
    dni: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      setSnackbarOpen(true);
      return;
    }

    try {
      const order = {
        buyerDetails,
        paymentMethod,
        cardDetails: paymentMethod === "creditCard" ? cardDetails : null,
        bankDetails: paymentMethod === "bankTransfer" ? bankDetails : null,
        cartItems,
        totalQuantity,
        totalPrice,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "orders"), order);
      console.log("Orden guardada con éxito");
      setOrderData(order);
      setSnackbarOpen(true);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error al guardar la orden: ", error);
    }
  };

  const handleInstallmentsChange = (event) => {
    setInstallments(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleBuyerDetailsChange = (event) => {
    const { name, value } = event.target;
    setBuyerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("GRACIAS POR ELEGIR A DREAM!", 10, 20);
    doc.text("Detalles de la Compra", 10, 30);
    doc.text(
      `Comprador: ${orderData.buyerDetails.firstName} ${orderData.buyerDetails.lastName}`,
      10,
      40
    );
    doc.text(`Email: ${orderData.buyerDetails.email}`, 10, 50);
    doc.text(`Teléfono: ${orderData.buyerDetails.phone}`, 10, 60);
    doc.text(`Domicilio de entrega: ${orderData.buyerDetails.address}`, 10, 70);
    doc.text(`Ciudad: ${orderData.buyerDetails.city}`, 10, 80);
    doc.text(`Provincia: ${orderData.buyerDetails.province}`, 10, 90);
    doc.text(`C.P: ${orderData.buyerDetails.postalCode}`, 10, 100);

    doc.text(`Total de productos: ${orderData.totalQuantity}`, 10, 110);
    doc.text(
      `Total de la compra: $${orderData.totalPrice.toFixed(2)}`,
      10,
      120
    );
    doc.text(
      `Método de pago: ${
        orderData.paymentMethod === "creditCard"
          ? "Tarjeta de Crédito"
          : "Tarjeta de débito"
      }`,
      10,
      130
    );

    if (orderData.paymentMethod === "creditCard") {
      doc.text(
        `Número de tarjeta: ${orderData.cardDetails.cardNumber}`,
        10,
        140
      );
      doc.text(
        `Fecha de expiración: ${orderData.cardDetails.expirationDate}`,
        10,
        150
      );
    } else if (orderData.paymentMethod === "bankTransfer") {
      doc.text(
        `Número de tarjeta: ${orderData.bankDetails.accountNumber}`,
        10,
        140
      );
      doc.text(`CVV: ${orderData.bankDetails.routingNumber}`, 10, 150);
    }

    doc.save("comprobante_compra.pdf");
    handleCloseDialog();
  };

  const installmentPrice = totalPrice / installments;

  return (
    <Box
      mt={20}
      sx={{
        marginLeft: { xs: "2%", md: "20%" },
        marginRight: { xs: "2%", md: "20%" },
        textAlign: "center",
      }}
      textAlign="center"
    >
      <Typography variant="h4" gutterBottom>
        Verificá los datos y completá tu pago.
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: 5 }}>
        Resumen de la compra:
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 10 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell align="center">Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <img src={item.imageSrc} alt={item.productName} height="50" />
                </TableCell>
                <TableCell align="center">{item.productName}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="subtitle1" gutterBottom>
        Total de productos: {totalQuantity}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total de la compra: $ {totalPrice ? totalPrice.toFixed(2) : "0.00"}
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Datos del comprador y de envío
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <TextField
            label="DNI"
            name="dni"
            value={buyerDetails.dni}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Nombre"
            name="firstName"
            value={buyerDetails.firstName}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Apellido"
            name="lastName"
            value={buyerDetails.lastName}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Teléfono"
            name="phone"
            value={buyerDetails.phone}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={buyerDetails.email}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Domicilio de entrega"
            name="address"
            value={buyerDetails.address}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Ciudad"
            name="city"
            value={buyerDetails.city}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Provincia"
            name="province"
            value={buyerDetails.province}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="País"
            name="country"
            value={buyerDetails.country}
            onChange={handleBuyerDetailsChange}
            required
          />
          <TextField
            label="Código Postal"
            name="postalCode"
            value={buyerDetails.postalCode}
            onChange={handleBuyerDetailsChange}
            required
          />
        </Box>
      </Box>

      <Box mt={4}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            marginRight: { xs: 0, md: 1 },
            marginBottom: { xs: 2, md: 1 },
          }}
        >
          Seleccione el medio de pago:
        </Typography>
        <Select
          value={paymentMethod || "Medios disponibles"}
          onChange={handlePaymentMethodChange}
          sx={{
            textAlign: { xs: "center", md: "left" },
            marginBottom: 2,
            marginTop: 5,
          }}
        >
          <MenuItem disabled value="Medios disponibles">
            Medios disponibles
          </MenuItem>
          <MenuItem value="creditCard">Tarjeta de crédito</MenuItem>
          <MenuItem value="bankTransfer">Tarjeta de débito</MenuItem>
        </Select>
      </Box>
      {paymentMethod === "creditCard" && (
        <>
          <Box mt={4}>
            <TextField
              label="Número de tarjeta"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
              sx={{
                marginRight: { xs: 0, md: 1 },
                marginBottom: { xs: 2, md: 1 },
              }}
            />
            <TextField
              label="Fecha de expiración"
              value={cardDetails.expirationDate}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  expirationDate: e.target.value,
                })
              }
              sx={{
                marginRight: { xs: 0, md: 1 },
                marginBottom: { xs: 2, md: 1 },
              }}
            />
            <TextField
              label="CVV"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
              sx={{
                marginRight: { xs: 0, md: 1 },
                marginBottom: { xs: 2, md: 1 },
              }}
            />
          </Box>
          <Box mt={4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                marginRight: { xs: 0, md: 1 },
                marginBottom: { xs: 2, md: 1 },
              }}
            >
              Seleccione cantidad de cuotas:
            </Typography>
            <Select
              value={installments}
              onChange={handleInstallmentsChange}
              sx={{
                marginRight: { xs: 0, md: 1 },
                marginBottom: { xs: 2, md: 1 },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((option) => (
                <MenuItem key={option} value={option}>
                  {option} cuota{option !== 1 && "s"}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            Valor de cada cuota: $
            {installmentPrice ? installmentPrice.toFixed(2) : "0.00"}
          </Typography>
        </>
      )}
      {paymentMethod === "bankTransfer" && (
        <>
          <Box mt={4}>
            <TextField
              label="Número de tarjeta"
              value={bankDetails.accountNumber}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  accountNumber: e.target.value,
                })
              }
              sx={{
                marginRight: { xs: 0, md: 1 },
                marginBottom: { xs: 2, md: 1 },
              }}
            />
            <TextField
              label="CVV"
              value={bankDetails.routingNumber}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  routingNumber: e.target.value,
                })
              }
            />
          </Box>
        </>
      )}
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
          style={{
            backgroundColor: "#ffffff49",
            marginTop: 20,
            marginBottom: 10,
            border: "solid",
          }}
          sx={{
            width: { xs: "70%", md: "40%" },
            borderRadius: 20,
            marginTop: 5,
            alignItem: "center",
          }}
          onClick={handleCheckout}
        >
          <Typography
            variant="body2"
            color="text.primary"
            style={{ padding: 2 }}
          >
            Finalizar y Pagar
          </Typography>
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={
          paymentMethod
            ? "Compra exitosa"
            : "Por favor seleccione un medio de pago"
        }
      />
      {orderData && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Detalles de la Compra</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Comprador:</strong> {orderData.buyerDetails.firstName}{" "}
              {orderData.buyerDetails.lastName}
              <br />
              <strong>Email:</strong> {orderData.buyerDetails.email}
              <br />
              <strong>Teléfono:</strong> {orderData.buyerDetails.phone}
              <br />
              <strong>Domicilio de entrega:</strong>{" "}
              {orderData.buyerDetails.address}, {orderData.buyerDetails.city},{" "}
              {orderData.buyerDetails.province},{" "}
              {orderData.buyerDetails.country},{" "}
              {orderData.buyerDetails.postalCode}
              <br />
              <strong>Total de productos:</strong> {orderData.totalQuantity}
              <br />
              <strong>Total de la compra:</strong> $
              {orderData.totalPrice.toFixed(2)}
              <br />
              <strong>Método de pago:</strong>{" "}
              {orderData.paymentMethod === "creditCard"
                ? "Tarjeta de Crédito"
                : "Tarjeta de Débito"}
              <br />
              {orderData.paymentMethod === "creditCard" && (
                <>
                  <strong>Número de tarjeta:</strong>{" "}
                  {orderData.cardDetails.cardNumber}
                  <br />
                  <strong>Fecha de expiración:</strong>{" "}
                  {orderData.cardDetails.expirationDate}
                  <br />
                </>
              )}
              {orderData.paymentMethod === "bankTransfer" && (
                <>
                  <strong>Número de tarjeta:</strong>{" "}
                  {orderData.bankDetails.accountNumber}
                  <br />
                  <strong>CVV:</strong> {orderData.bankDetails.routingNumber}
                  <br />
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleCloseDialog();
              }}
              color="primary"
              component={Link}
              to="/"
            >
              Cerrar
            </Button>
            <Button onClick={handleDownloadPDF} color="secondary">
              Descargar Comprobante
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CheckOut;
