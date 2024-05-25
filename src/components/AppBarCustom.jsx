import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

export default function AppBarCustom() {
  const [open, setOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignIn = () => {
    const userName = window.prompt("Por favor, ingrese su nombre:");
    if (userName === "Admin") {
      setIsSignedIn(true);
      alert("Inicio de sesión exitoso!");
    } else {
      alert("Nombre incorrecto. Intente nuevamente.");
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    alert("Cierre de sesión exitoso");
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
          marginTop: 5,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={"../src/assets/img/logo.png"}
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  component={Link}
                  to="/"
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography color="text.primary">Inicio</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/Contacto"
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography color="text.primary">Contacto</Typography>
                </MenuItem>
                {isSignedIn && (
                  <MenuItem
                    component={Link}
                    to="/Ordenes"
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography color="text.primary">Ordenes</Typography>
                  </MenuItem>
                )}
                {isSignedIn && (
                  <MenuItem
                    sx={{ py: "6px", px: "12px", color: "black" }}
                    component={Link}
                    to="/Suscriptores"
                  >
                    Suscriptores
                  </MenuItem>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <MenuItem
                onClick={() => scrollToSection("faq")}
                sx={{ py: "6px", px: "12px" }}
              ></MenuItem>
              {isSignedIn && (
                <Typography sx={{ py: "6px", px: "12px" }} color="text.primary">
                  Hola, Administrador!
                </Typography>
              )}
              {!isSignedIn ? (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/"
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleSignOut}
                >
                  Sign out
                </Button>
              )}
              <MenuItem
                component={Link}
                to="/Carrito"
                sx={{ py: "6px", px: "12px" }}
              >
                <CartWidget />
              </MenuItem>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  ></Box>
                  <MenuItem component={Link} to="/Carrito">
                    <CartWidget />
                  </MenuItem>
                  <MenuItem component={Link} to="/">
                    Inicio
                  </MenuItem>

                  <MenuItem component={Link} to="/Contacto">
                    Contacto
                  </MenuItem>

                  {isSignedIn && (
                    <MenuItem
                      component={Link}
                      to="/Ordenes"
                      sx={{ py: "6px", px: "12px" }}
                    >
                      <Typography color="text.primary">Ordenes</Typography>
                    </MenuItem>
                  )}
                  {isSignedIn && (
                    <MenuItem
                      sx={{ py: "6px", px: "12px", color: "black" }}
                      component={Link}
                      to="/Suscriptores"
                    >
                      Suscriptores
                    </MenuItem>
                  )}

                  <Divider />
                  {isSignedIn && (
                    <Typography
                      sx={{ py: "6px", px: "12px" }}
                      color="text.primary"
                    >
                      Hola, Pablo!
                    </Typography>
                  )}
                  {!isSignedIn ? (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleSignIn}
                        sx={{ width: "100%" }}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Button
                        component={Link}
                        to="/"
                        color="primary"
                        variant="contained"
                        onClick={handleSignOut}
                        sx={{ width: "100%" }}
                      >
                        Sign out
                      </Button>
                    </MenuItem>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppBarCustom.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]),
  toggleColorMode: PropTypes.func,
};
