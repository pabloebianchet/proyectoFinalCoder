import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Skeleton from "./skeleton";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none", // Eliminar la sombra/borde
  padding: theme.spacing({ xs: 3, sm: 3, md: 5 }), // Ajusta el padding según el tamaño del dispositivo
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0), // Ajusta este valor según el margen deseado
  marginTop: theme.spacing(5), // Margen superior
}));

export default function RowAndColumnSpacing() {
  return (
    <StyledBox>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Skeleton />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Skeleton />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Skeleton />
          </Item>
        </Grid>
      </Grid>
    </StyledBox>
  );
}
