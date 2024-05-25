// OrdersTable.js
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 20 }}>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold">Fecha</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Comprador</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Email</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Teléfono</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Dirección de entrega</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Ciudad</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Provincia</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">C.P.</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Total de productos</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Total de la compra</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Método de pago</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {order.createdAt.toDate().toLocaleDateString()}
              </TableCell>
              <TableCell>{`${order.buyerDetails.firstName} ${order.buyerDetails.lastName}`}</TableCell>
              <TableCell>{order.buyerDetails.email}</TableCell>
              <TableCell>{order.buyerDetails.phone}</TableCell>
              <TableCell>{`${order.buyerDetails.address}, ${order.buyerDetails.city}, ${order.buyerDetails.province}, ${order.buyerDetails.country}`}</TableCell>
              <TableCell>{order.buyerDetails.city}</TableCell>
              <TableCell>{order.buyerDetails.province}</TableCell>
              <TableCell>{order.buyerDetails.postalCode}</TableCell>
              <TableCell>{order.totalQuantity}</TableCell>
              <TableCell>{`$${order.totalPrice.toFixed(2)}`}</TableCell>

              <TableCell>
                {order.paymentMethod === "creditCard"
                  ? "Tarjeta de Crédito"
                  : "Transferencia Bancaria"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
