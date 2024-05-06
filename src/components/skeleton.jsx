import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

export default function SkeletonExample() {
  return (
    <Stack spacing={2}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Skeleton variant="circular" width={40} height={40} />
        </Grid>
        <Grid item xs style={{ maxWidth: 250 }}>
          {" "}
          {/* Usamos `xs` para que el Grid tome todo el ancho disponible */}
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </Grid>
      </Grid>
      <Skeleton variant="rectangular" width={350} height={90} />
      <Skeleton variant="rounded" width={350} height={90} />
    </Stack>
  );
}
