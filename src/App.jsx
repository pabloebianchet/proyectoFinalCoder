import { Box } from "@mui/material";
import "./App.css";
import AppBarCustom from "./components/AppBarCustom";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <Box className="App" sx={{ marginTop: 10 }}>
      <AppBarCustom />
      <ItemListContainer mensaje="Este es un mensaje nuevo" />
    </Box>
  );
}

export default App;
