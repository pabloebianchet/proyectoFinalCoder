import { useEffect, useState } from "react";
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
} from "@mui/material";

import tarjetas from "../assets/img/tarjetas.png";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("../src/assets/products.json");
        if (!response.ok) {
          throw new Error("Error al cargar los datos del producto");
        }
        const data = await response.json();
        const foundProduct = data.find((p) => p.id === parseInt(productId));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error(`Producto con ID ${productId} no encontrado.`);
        }
      } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

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
                    style={{
                      backgroundColor: "#6161614b",
                      marginTop: 50,
                      marginBottom: 10,
                    }}
                    sx={{ borderRadius: "20px" }}
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
    </Box>
  );
};

export default ProductDetail;
