import { Box } from "@mui/material";

import ItemListContainer from "./ItemListContainer";

import CustomSurplusAvatars from "./BannerMark";
import SnackNews from "./SnackNews";

function Home() {
  return (
    <Box sx={{ marginTop: 15 }}>
      <CustomSurplusAvatars />
      <ItemListContainer />
      <SnackNews />
    </Box>
  );
}

export default Home;
