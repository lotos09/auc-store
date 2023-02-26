import "./App.css";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/navigation/AppRouter";
import { myBase } from "./firebase/config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export const Context = createContext(null);
// const firestore = firebase.firestore();
const auth = getAuth();
const user = auth.currentUser;

function App() {
  const [user] = useAuthState(auth);
  const [sharedData, setSharedData] = useState({});

  return (
    <Context.Provider
      value={{
        test: "test",
        auth,
        user,
        sharedData,
        setSharedData,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
