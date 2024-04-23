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
import PropTypes from "prop-types";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../styles/productcard.css";

const ProductCard = ({ product, initialCount }) => {
  const { tradeMark, productName, descript, text, imageSrc } = product;
  const [count, setCount] = useState(initialCount);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
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
          text: descript,
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
    handleCloseMenu(); // Cerrar el menú después de hacer clic en "Guardar"
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
            </Menu>
          </div>
        }
        title={productName}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageSrc}
        alt={productName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {descript}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={toggleLike}>
          <FavoriteIcon color={liked ? "error" : "inherit"} />
        </IconButton>
        <IconButton aria-label="share" onClick={shareProduct}>
          <ShareIcon />
        </IconButton>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              padding: "0.5rem",
              transition: "background-color 0.3s",
              marginRight: "8px",
            }}
            onClick={decrement}
          >
            -
          </button>
          <span style={{ margin: "0 1rem", fontSize: "1.2rem" }}>{count}</span>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              padding: "0.5rem",
              transition: "background-color 0.3s",
            }}
            onClick={increment}
          >
            +
          </button>
        </div>
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{text}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageSrc: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    tradeMark: PropTypes.string.isRequired,
    descript: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  initialCount: PropTypes.number.isRequired,
};

export default ProductCard;
