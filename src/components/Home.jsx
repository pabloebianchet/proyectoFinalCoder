import { Box } from "@mui/material";

import ItemListContainer from "./ItemListContainer";

import CustomSurplusAvatars from "./BannerMark";

function Home() {
  return (
    <Box sx={{ marginTop: 15 }}>
      <CustomSurplusAvatars />
      <ItemListContainer />
    </Box>
  );
}

export default Home;
