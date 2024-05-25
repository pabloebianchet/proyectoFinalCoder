import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import tarjetas from "../assets/img/tarjetas.png";
import { useCart } from "../context/CartContext";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate de que esta ruta y nombre coincidan exactamente con el nombre del archivo

const ProductDetail = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "dataProduct", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error(`Producto con ID ${productId} no encontrado.`);
        }
      } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setSnackbarOpen(true); // Abrir Snackbar al agregar el producto al carrito
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ marginTop: 20 }}>
      {product && (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
          sx={{ marginBottom: 5 }}
        >
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="400"
                image={product.imageSrc}
                alt={product.productName}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                ...(isMobile && { marginTop: 6 }),
              }}
            >
              <CardContent style={{ marginTop: 15 }}>
                <Typography variant="h5" gutterBottom>
                  {product.productName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  $ {product.price} - 6 Cuotas s/ interés.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.text}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    onClick={handleAddToCart} // Asigna handleAddToCart al evento onClick del botón
                    style={{
                      backgroundColor: "#ffffff49",
                      marginTop: 50,
                      marginBottom: 10,
                      border: "solid",
                    }}
                    sx={{ borderRadius: "50px" }}
                  >
                    <Typography
                      variant="body2"
                      color="text.primary"
                      style={{ padding: 6 }}
                    >
                      Agregar al Carrito
                    </Typography>
                  </Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <img
                    src={tarjetas}
                    alt="Tarjetas"
                    style={{ width: "50%", marginTop: 20 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Producto Agregado al Carrito
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;
