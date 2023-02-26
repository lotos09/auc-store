import React, { useContext } from "react";

import { Button, TextField } from "@mui/material";
import LotItem from "./LotItem";

const LotsGrid = (lots) => {
  return (
    <>
      {lots.lots.map((lot, index) => {
        return <LotItem lot={lot} key={index} />;
      })}
    </>
  );
};

export default LotsGrid;
