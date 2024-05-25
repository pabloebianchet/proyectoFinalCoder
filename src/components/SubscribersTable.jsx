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

const SubscribersTable = () => {
  const [suscriptores, setSuscriptores] = useState([]);

  useEffect(() => {
    const fetchSuscriptores = async () => {
      const suscriptoresCollection = collection(db, "suscriptores");
      const suscriptoresSnapshot = await getDocs(suscriptoresCollection);
      const suscriptoresData = suscriptoresSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuscriptores(suscriptoresData);
    };

    fetchSuscriptores();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 20 }}>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold">Email Suscriptor</Typography>
            </TableCell>

            <TableCell>
              <Typography fontWeight="bold">Fecha de Suscripción</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suscriptores.map((suscriptor) => (
            <TableRow key={suscriptor.id}>
              <TableCell>{suscriptor.email}</TableCell>

              <TableCell>
                {suscriptor.timestamp.toDate().toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscribersTable;
