import React, { useContext } from "react";
import LoginPage from "../LoginPage/LoginPage";
import { ROUTES } from "../../constants/router";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "./Navbar";
import MainPage from "../MainPage/MainPage";
import NotFound from "../shared/NotFoundPage";
import { Context } from "../../App";
import StorePage from "../StorePage/StorePage";
import AccountDetailsPage from "../AccountDetailsPage/AccountDetailsPage";
import CartPage from "../CartPage/CartPage";

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route key={ROUTES.MAIN_PAGE} element={<MainPage />} />
            <Route
              key={ROUTES.STORE}
              path={ROUTES.STORE}
              element={<StorePage />}
            />
            <Route
              key={ROUTES.ACCOUNT}
              path={ROUTES.ACCOUNT}
              element={<AccountDetailsPage />}
            />
            <Route
              key={ROUTES.CART}
              path={ROUTES.CART}
              element={<CartPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default AppRouter;
