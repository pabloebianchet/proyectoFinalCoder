import ItemList from "./ItemList";

const ItemListContainer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
        maxWidth: 1200,
      }}
    >
      <ItemList />
    </div>
  );
};

export default ItemListContainer;
