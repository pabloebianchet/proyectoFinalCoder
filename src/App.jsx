import { Box } from "@mui/material";
import "./App.css";
import AppBarCustom from "./components/AppBarCustom";
import ItemListContainer from "./components/ItemListContainer";
import Footer from "./components/Footer";

function App() {
  return (
    <Box className="App" sx={{ marginTop: 10 }}>
      <AppBarCustom />
      <ItemListContainer />
      <Footer />
    </Box>
  );
}

export default App;
