import PropTypes from "prop-types"; // Importa PropTypes
import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = ({ phoneNumber }) => {
  const handleClick = () => {
    if (validatePhoneNumber(phoneNumber)) {
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
    } else {
      alert("Número de teléfono no válido");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
  };

  return (
    <div
      style={{ position: "fixed", bottom: "30px", right: "20px", zIndex: 9999 }}
    >
      <Fab color="primary" aria-label="whatsapp" onClick={handleClick}>
        <WhatsAppIcon />
      </Fab>
    </div>
  );
};

// Agrega la validación de PropTypes
WhatsAppButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};

export default WhatsAppButton;
