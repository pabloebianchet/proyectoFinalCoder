import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import "../styles/item.css";
import { Link } from "react-router-dom";
import tarjetas from "../assets/img/tarjetas.png";

const Item = ({ product }) => {
  const { id, tradeMark, productName, price, text, imageSrc } = product;
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleLike = () => {
    setLiked(!liked);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator
        .share({
          title: productName,
          text: price,
          url: window.location.href,
        })
        .then(() => console.log("Producto compartido con éxito"))
        .catch((error) =>
          console.error("Error al compartir el producto:", error)
        );
    } else {
      console.log(
        "La función de compartir no está disponible en este navegador."
      );
    }
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSaveCard = () => {
    alert("El producto ha sido guardado");
    handleCloseMenu();
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    const percentX = offsetX / width;
    const percentY = offsetY / height;

    const newX = percentX * 100;
    const newY = percentY * 100;

    setZoomPosition({ x: newX, y: newY });
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 5 }}>
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={tradeMark} />}
        action={
          <div>
            <IconButton
              aria-label="settings"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClickMenu}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleSaveCard}>Guardar</MenuItem>
              <MenuItem onClick={shareProduct}>Compartir</MenuItem>
              <MenuItem component={Link} to={`/ProductDetail/${id}`}>
                Ver Producto
              </MenuItem>
            </Menu>
          </div>
        }
        title={productName}
      />
      <div
        className="zoomable-image-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          height="194"
          image={imageSrc}
          alt={productName}
          className="zoomable-image"
        />
        {isZoomed && (
          <div
            className="zoom-area"
            style={{
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        )}
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          $ {price} - 6 Cuotas s/ interés.
          <img
            src={tarjetas}
            alt="Descripción de la imagen"
            style={{ width: "50%", marginTop: 20 }}
          />
        </Typography>

        <Button
          style={{
            backgroundColor: "#ffffff49",
            marginTop: 50,
            marginBottom: 10,
            border: "solid",
          }}
          sx={{ width: "50%", borderRadius: 20, marginTop: 5 }}
          component={Link}
          to={`/ProductDetail/${id}`}
        >
          <Typography
            variant="body2"
            color="text.primary"
            style={{ padding: 6 }}
          >
            Ver Producto
          </Typography>
        </Button>
      </CardContent>
      <CardActions disableSpacing>
        <div style={{ margin: "auto" }}>
          <IconButton aria-label="add to favorites" onClick={toggleLike}>
            <FavoriteIcon color={liked ? "error" : "inherit"} />
          </IconButton>
          <IconButton aria-label="share" onClick={shareProduct}>
            <ShareIcon />
          </IconButton>
          <IconButton
            aria-expanded={expanded}
            onClick={handleExpandClick}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          {showHeart && (
            <FavoriteIcon
              color="error"
              style={{
                position: "absolute",
                animation: "fly-heart 1s ease-out",
                transformOrigin: "center",
                top: "-10px",
              }}
              onAnimationEnd={() => setShowHeart(false)}
            />
          )}
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{text}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageSrc: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    tradeMark: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
