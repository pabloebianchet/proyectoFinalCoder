import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BotonContador() {
  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: 20 }}>
      <Button color="secondary" onClick={onIncrement}>
        Incrementar
      </Button>

      <Button variant="contained" color="success" onClick={onDecrement}>
        Decrementar
      </Button>
    </Stack>
  );
}
