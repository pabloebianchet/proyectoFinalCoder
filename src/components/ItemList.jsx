import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import productsData from "../assets/products.json";
import GridSkeleton from "./GridSkeleton";

function ItemList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simula una operación asincrónica con un retraso de 2 segundos
      setTimeout(() => {
        setProducts(productsData);
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        marginTop: "2rem",
      }}
    >
      <div style={{ position: "relative" }}>
        {loading && (
          <div>
            <GridSkeleton />
            <GridSkeleton />
          </div>
        )}
        <Grid container spacing={2}>
          {!loading &&
            products.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProductCard product={product} initialCount={0} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default ItemList;
