import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Item from "./Item";
import GridSkeleton from "./GridSkeleton";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate de que esta ruta y nombre coincidan exactamente con el nombre del archivo

function ItemList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dataProduct")); // Nombre de la colección en Firestore
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error al obtener los productos: ", error);
      } finally {
        setLoading(false);
      }
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
                <Item product={product} initialCount={0} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default ItemList;
