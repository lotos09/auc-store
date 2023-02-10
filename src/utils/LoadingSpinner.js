import React from "react";
import { Puff } from "react-loader-spinner";

const style = {
  wrapper: {
    justifyContent: "center",
    paddingTop: "20vw",
  },
};

const LoadingSpinner = () => (
  <Puff
    wrapperStyle={style.wrapper}
    height="80"
    width="80"
    radius={1}
    color="#1676d2"
    ariaLabel="puff-loading"
    wrapperClass=""
    visible={true}
  />
);

export default LoadingSpinner;
