import React from "react";

import LotItem from "./LotItem";

const styles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const LotsGrid = (lots) => {
  return (
    <div style={styles}>
      {lots.lots.map((lot, index) => {
        return <LotItem lot={lot} key={index} />;
      })}
    </div>
  );
};

export default LotsGrid;
