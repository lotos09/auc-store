import React, { useCallback, useContext, useMemo } from "react";
import { Context } from "../../App";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { makeCollectionPath, makeRequest } from "../../api/general";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const { auth, setUsers } = useContext(Context);
  const user = auth.currentUser;

  const loginForm = useFormik({
    initialValues: {},
    onSubmit: () => loginUser(),
  });

  const registerForm = useFormik({
    initialValues: {},
    onSubmit: () => registerUser(),
  });

  const registerUser = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        registerForm.values.registerEmail,
        registerForm.values.registerPassword
      );
      await makeRequest(
        makeCollectionPath(`usersStore`, user.accessToken, ""),
        "POST",
        { ...registerForm.values, uid: newUser.user.uid }
      );
      console.log({ newUser, registerForm });
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginUser = async () => {
    try {
      const newUser = await signInWithEmailAndPassword(
        auth,
        loginForm.values.loginEmail,
        loginForm.values.loginPassword
      );
      fetch(makeCollectionPath("users", newUser.accessToken, ""))
        .then((response) => response.json())
        .then((data) => setUsers(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(loginForm.values);

  const registerFormRender = useCallback(() => {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Register user</h2>
        <form onSubmit={registerForm.handleSubmit}>
          <TextField
            required
            id="registerEmail"
            label="registerEmail"
            name="registerEmail"
            onChange={registerForm.handleChange}
            value={registerForm.values.registerEmail}
          />

          <TextField
            sx={{ color: "red", marginLeft: "10px" }}
            required
            id="registerPassword"
            label="registerPassword"
            name="registerPassword"
            onChange={registerForm.handleChange}
            value={registerForm.values.registerPassword}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    );
  }, []);

  const loginFormRender = useCallback(() => {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Log in</h2>
        <form onSubmit={loginForm.handleSubmit}>
          <TextField
            required
            id="loginEmail"
            label="loginEmail"
            name="loginEmail"
            onChange={loginForm.handleChange}
            value={loginForm.values.loginEmail}
          />

          <TextField
            required
            id="loginPassword"
            label="loginPassword"
            name="loginPassword"
            onChange={loginForm.handleChange}
            value={loginForm.values.loginPassword}
            style={{ marginLeft: "20px" }}
          />

          <Button type="submit" variant="contained" sx={{ marginLeft: "20px" }}>
            Submit
          </Button>
        </form>
      </div>
    );
  }, []);

  return (
    <>
      <div>{loginFormRender()}</div>
      <div>{registerFormRender()}</div>
    </>
  );
};

export default LoginPage;
