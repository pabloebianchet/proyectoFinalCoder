import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";

import WhatsAppButton from "./WhatsAppButton";

const Contact = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box sx={{ marginTop: 20 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={2} // Asegúrate de incluir el espaciado aquí
        sx={{ marginBottom: 5 }}
      >
        {/* Columna izquierda: Formulario de contacto */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Formulario de Contacto
              </Typography>
              {/* Aquí puedes colocar el formulario de contacto */}
              <form>
                {/* Campo para el nombre */}
                <TextField
                  id="nombre"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {/* Campo para el correo electrónico */}
                <TextField
                  id="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                {/* Área de texto para el mensaje */}
                <TextField
                  id="mensaje"
                  label="Mensaje"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#ffffff49",
                      marginTop: 50,
                      marginBottom: 10,
                      border: "solid",
                    }}
                    sx={{ width: "30%", borderRadius: 20, marginTop: 5 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.primary"
                      style={{ padding: 6 }}
                    >
                      Enviar
                    </Typography>
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {/* Columna derecha: Texto */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              ...(isMobile && { marginTop: 6 }),
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                ...(isMobile && { marginTop: 5 }),
              }}
            >
              <Typography variant="h5" gutterBottom>
                Información de Contacto
              </Typography>
              <Typography variant="h6" gutterBottom>
                Por cualquier consulta, no dudés en escribirnos. Uno de nuestros
                asesores te contactará dentro de las 48 horas. También podés
                comunicarte por whatsapp, o por MD desde nuestro Instagram.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <WhatsAppButton phoneNumber="+541136420582" />
    </Box>
  );
};

export default Contact;
