import React from "react";
import ContentLoader from "react-content-loader";
import { Grid } from "@mui/material";

const DoorDashFavorite = (props) => (
  <Grid
    container
    spacing={{ xs: 4, md: 8 }}
    columns={{ xs: 6, sm: 12, md: 16 }}
  >
    <ContentLoader
      width={380}
      height={280}
      viewBox="0 0 450 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
      {...props}
    >
      <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
      <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
      <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
    </ContentLoader>
  </Grid>
);

DoorDashFavorite.metadata = {
  name: "Name", // My name
  description: "", // Little tagline
  filename: "DoorDashFavorite", // filename of your loader
};

export default DoorDashFavorite;
