import PropTypes from "prop-types";

const ItemListContainer = ({ mensaje }) => {
  return <div>{mensaje}</div>;
};

ItemListContainer.propTypes = {
  mensaje: PropTypes.string.isRequired,
};

export default ItemListContainer;
