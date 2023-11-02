import React, { useContext, useMemo, useState } from "react";
import { useFormik } from "formik";
import { makeCollectionPath, makeRequest } from "../../api/general";
import { Context } from "../../App";
import { textStyles } from "../shared/styles";

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

const whiteThemeStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "348px",
    height: "533px",
    margin: "30px 20px",
    fontFamily: "Helvetica Neue",
  },
  innerWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 15,
    maxWidth: "320px",
    maxHeight: "500px",
  },
  imgContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  img: {
    width: "348px",
    height: "348px",
    objectFit: "cover",
    objectPosition: "25% 25%",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
  },
  soldOut: {
    color: "red",
    fontSize: 24,
    fontWeight: 600,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    ...textStyles.orange,
    margin: "8px 0",
  },
  description: {
    ...textStyles.black,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  categoryTag: {
    ...textStyles.gray,
  },
  priceSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  current: {
    ...textStyles.black,
  },
  buyout: {
    ...textStyles.black,
  },
  form: {},
});

/**
 * Component to render a lot item
 * @param {Object} lot - The lot object to render
 * @returns {ReactElement} - The rendered lot item component
 */
const LotItem = ({ lot }) => {
  // Get the user from context
  const { user } = useContext(Context);

  // Get the user's access token
  const token = useMemo(() => user?.accessToken, [user]);

  // Set the initial current price of the lot
  const [currentPrice, setCurrentPrice] = useState(
    lot?.currentPrice || lot.startPrice
  );

  // Get the styles for the lot item
  const styles = useStyles(lot?.isSoldOut);

  // Get the new styles for the lot item
  const newStyles = whiteThemeStyles();

  // Get the preview image of the lot
  const preview = lot.images[0];

  // Formik form for the lot item
  const lotItemForm = useFormik({
    initialValues: {
      bid: currentPrice,
    },
  });

  /**
   * Function to handle the bid click event
   * @returns {Promise<void>} - A promise that resolves when the bid click event is handled
   */
  const onBidClick = async () => {
    // Make a request to update the current price of the lot
    const res = await makeRequest(
      makeCollectionPath("lots", token, `/${lot.id}`),
      "PATCH",
      {
        currentPrice: lotItemForm.values.bid,
      }
    );

    // Update the current price state with the response current price
    setCurrentPrice(res.currentPrice);
  };

  /**
   * Function to handle the buyout click event
   * @returns {Promise<void>} - A promise that resolves when the buyout click event is handled
   */
  const onByOutClick = async () => {
    // Make a request to mark the lot as sold out and add the buyer information
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

    // Make a request to update the purchases collection with the purchased lot
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
    <div style={newStyles.container}>
      <img alt="iamge preview" style={newStyles.img} src={preview} />

      <div style={newStyles.bottomContainer}>
        <div style={newStyles.titleContainer}>
          <div style={newStyles.title}>{lot.title}</div>
          {/*<div style={newStyles.soldOut}>{lot?.isSoldOut && "SOLD OUT!"}</div>*/}
        </div>

        <div style={newStyles.description}>{lot.description}</div>
        <div style={newStyles.categoryTag}>category tag</div>

        <div style={newStyles.priceSection}>
          <div style={newStyles.current}>current price: {currentPrice}</div>
          <div style={newStyles.buyout}>buyout price: {lot.buyoutPrice}</div>
        </div>

        <div style={newStyles.form}></div>
      </div>
    </div>
  );
};

export default LotItem;
