import React, { useContext, useMemo, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { makeCollectionPath, makeRequest } from "../../api/general";
import { Context } from "../../App";

const useStyles = (isSoldOut) => ({
  previewContainer: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-around",
    borderBottom: "1px solid gray",
    paddingBottom: 18,
  },
  previewCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  previewDeleteButton: {
    marginLeft: 10,
    width: 200,
  },
  previewImg: {
    border: "solid 1px black",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    margin: "10px",
    borderRadius: "5px",
    maxWidth: 300,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 600,
  },
  leftLot: {
    minWidth: 300,
  },
  rightLot: {},
  buttons: {
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    border: "1px solid black",
  },
  soldOutImg: {
    color: "red",
    fontSize: "1rem",
    border: "5px red solid",
    padding: 20,
    marginTop: 20,
  },
});

const LotItem = ({ lot }) => {
  const { user } = useContext(Context);
  const token = useMemo(() => user?.accessToken, [user]);
  const [currentPrice, setCurrentPrice] = useState(
    lot?.currentPrice || lot.startPrice
  );

  const styles = useStyles(lot?.isSoldOut);

  const preview = lot.images[0];

  const lotItemForm = useFormik({
    initialValues: {
      bid: currentPrice,
    },
  });

  const onBidClick = async () => {
    const res = await makeRequest(
      makeCollectionPath("lots", token, `/${lot.id}`),
      "PATCH",
      {
        currentPrice: lotItemForm.values.bid,
      }
    );
    setCurrentPrice(res.currentPrice);
  };

  const onByOutClick = async () => {
    await makeRequest(
      makeCollectionPath("lots", token, `/${lot.id}`),
      "PATCH",
      {
        isSoldOut: true,
        isByOut: true,
        buyerId: user.uid,
        buyerEmail: user.email,
      }
    );
    await makeRequest(
      makeCollectionPath("purchases", token, `/${user.uid}`),
      "PATCH",
      {
        [`${lot.id}`]: {
          title: lot.title,
        },
      }
    );
  };

  return (
    <div style={styles.previewContainer}>
      <div style={styles.leftLot}>
        <div>{lot.title}</div>
        <img
          style={styles.previewImg}
          height="200"
          src={preview}
          alt="preview"
        />
        <div>{lot.description}</div>
      </div>
      <div style={styles.rightLot}>
        <div>current price: {currentPrice}</div>
        <div>buyout price: {lot.buyoutPrice}</div>
        {lot?.isSoldOut && <div style={styles.soldOutImg}>Sold Out</div>}
      </div>
      <div style={styles.buttons}>
        <Button disabled={lot?.isSoldOut} onClick={onByOutClick}>
          Buyout
        </Button>
        <TextField
          disabled={lot?.isSoldOut}
          id="bid"
          label="bid amount"
          name="bid"
          onChange={lotItemForm.handleChange}
          value={lotItemForm.values.bid}
          type="number"
        />
        <Button disabled={lot?.isSoldOut} onClick={onBidClick}>
          Make bid
        </Button>
      </div>

      <div style={styles.divider}></div>
    </div>
  );
};

export default LotItem;
