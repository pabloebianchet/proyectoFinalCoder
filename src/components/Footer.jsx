import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterRoot = styled("footer")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  width: "100%",
}));

const FooterContent = styled("div")({
  maxWidth: 1200,
  margin: "0 auto",
});

const Footer = () => {
  return (
    <FooterRoot>
      <FooterContent>
        <Grid container justifyContent="space-between" spacing={0}>
          {/* Columna izquierda */}
          <Grid
            item
            xs={12}
            md={4}
            style={{ textAlign: "center", paddingLeft: 0 }}
          >
            <Typography variant="h6" gutterBottom color="text.primary">
              Contacto
            </Typography>
            <Typography variant="body2" color="text.primary">
              <Link href="mailto:info@example.com" color="text.primary">
                info@example.com
              </Link>
            </Typography>
            <Typography variant="body2" color="text.primary">
              Teléfono:{" "}
              <Link href="tel:+123456789" color="text.primary">
                +123456789
              </Link>
            </Typography>
          </Grid>

          {/* Columna central */}
          <Grid
            item
            xs={12}
            md={4}
            style={{ textAlign: "center", paddingLeft: 0 }}
          >
            <Typography
              variant="body2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <img
                src="../src/assets/img/logo.png"
                alt=""
                style={{ maxWidth: "100%", height: "auto", width: "100px" }}
              />
            </Typography>
          </Grid>

          {/* Columna derecha */}
          <Grid
            item
            xs={12}
            md={4}
            style={{ textAlign: "center", paddingLeft: 0 }}
          >
            <Typography variant="h6" gutterBottom color="text.primary">
              Síguenos
            </Typography>
            <Grid container justifyContent="center">
              <Grid item>
                <IconButton
                  aria-label="Facebook"
                  href="https://www.facebook.com"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Twitter" href="https://www.twitter.com">
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  aria-label="LinkedIn"
                  href="https://www.linkedin.com"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  href="https://www.instagram.com"
                >
                  <InstagramIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FooterContent>
    </FooterRoot>
  );
};

export default Footer;
