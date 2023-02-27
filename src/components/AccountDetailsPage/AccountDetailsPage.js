import React from "react";
import { Paper } from "@mui/material";
import { paperStyle } from "../../constants/styles";

const AccountDetailsPage = () => {
  return (
    <Paper
      sx={paperStyle.paper}
      elevation={2}
      children={<div>account details</div>}
    />
  );
};

export default AccountDetailsPage;
