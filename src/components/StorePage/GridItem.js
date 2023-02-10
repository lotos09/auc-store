import React from "react";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

const styles = {
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    m: 1,
    width: 450,
    height: 450,
  },
};

const GridItem = (lot) => {
  console.log(lot);
  return <div>{lot.title}</div>;
};

export default GridItem;
