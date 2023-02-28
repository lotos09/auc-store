import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { makeCollectionPath, makeRequest } from "../../api/general";
import { Button } from "@mui/material";
import { Context } from "../../App";

const CartPage = () => {
  const { auth, setUsers } = useContext(Context);
  const user = auth.currentUser;

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetch(makeCollectionPath("purchases", user.accessToken, `/${user.uid}`))
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.values(data);
        setPurchases(formattedData);
      });
  }, []);

  console.log(purchases);

  return (
    <div>
      {purchases?.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
};

export default CartPage;
