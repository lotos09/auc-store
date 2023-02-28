import React, { useContext, useEffect, useState } from "react";
import { makeCollectionPath } from "../../api/general";
import { Context } from "../../App";

const CartPage = () => {
  const { auth } = useContext(Context);
  const user = auth.currentUser;

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetch(makeCollectionPath("purchases", user.accessToken, `/${user.uid}`))
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Object.values(data);
        setPurchases(formattedData);
      });
  }, [user]);

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
