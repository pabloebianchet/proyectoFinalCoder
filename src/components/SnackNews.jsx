import { useState } from "react";
import {
  Snackbar,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function SnackNews() {
  const [open, setOpen] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const ingresar = async () => {
    setOpen(false);
    if (emailValid) {
      // Verifica si el correo electrónico es válido
      const suscriptor = {
        email: email,
        timestamp: new Date(), // Agrega una marca de tiempo para registrar cuándo se realizó la suscripción
      };

      try {
        await addDoc(collection(db, "suscriptores"), suscriptor);
        console.log("Suscriptor guardado con éxito");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error al guardar: ", error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      {/* Banner de suscripción */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            bgcolor: "#ffffffee",
            p: 4,
            borderRadius: 5,
            boxShadow: 4,
            maxWidth: "80vw", // Ancho máximo del banner
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" }, // Ancho adaptativo
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 2,
            }}
          >
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 2, color: "black" }}
          >
            ¡Suscríbete a nuestro newsletter! Recibe las mejores ofertas.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 2, color: "black", marginBottom: 3 }}
          >
            Podés darte de baja en cualquier momento.
          </Typography>
          <TextField
            id="email"
            placeholder="Correo electrónico"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, marginBottom: 5, marginTop: 4 }}
            value={email}
            onChange={handleEmailChange}
          />

          <Button
            onClick={ingresar}
            style={{
              backgroundColor: "#ffffff49",
              marginTop: 20,
              marginBottom: 10,
              border: "solid",
            }}
            sx={{
              width: "60%", // Ancho del botón
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
              Suscribirse
            </Typography>
          </Button>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Suscripción exitosa"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CheckCircle />
          </IconButton>
        }
        sx={{ bgcolor: "#000000", color: "#FFF" }}
      />
    </>
  );
}

export default SnackNews;
