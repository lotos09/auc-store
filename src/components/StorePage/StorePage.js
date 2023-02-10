import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { makeCollectionPath } from "../../api/general";
import { Context } from "../../App";
import { Paper } from "@mui/material";
import LotsGrid from "./LotsGrid";
import { paperStyle } from "../../constants/styles";

const StorePage = () => {
  const { user, sharedData } = useContext(Context);
  const { searchValue } = sharedData;
  const token = useMemo(() => user?.accessToken, [user]);
  const [lots, setLots] = useState([]);

  const getLots = () =>
    fetch(makeCollectionPath("lots", token, ""))
      .then((response) => response.json())
      .then((data) => setLots(Object.entries(data || [])));

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(makeCollectionPath("lots", token, ""))
      .then((response) => response.json())
      .then((data) => {
        let result = [];
        for (const [key, value] of Object.entries(data)) {
          result.push({ id: key, ...value });
        }
        setLots(result);
      });
  }, [token]);

  return (
    <Paper
      sx={paperStyle.paper}
      elevation={2}
      children={<div>{<LotsGrid lots={lots} />}</div>}
    />
  );
};

export default StorePage;
