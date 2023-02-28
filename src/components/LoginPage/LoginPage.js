import React, { useCallback, useContext } from "react";
import { Context } from "../../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { makeCollectionPath, makeRequest } from "../../api/general";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const { auth, setUsers } = useContext(Context);

  const loginForm = useFormik({
    initialValues: {},
    onSubmit: () => loginUser(),
  });

  const registerForm = useFormik({
    initialValues: {},
    onSubmit: () => registerUser(),
  });

  const registerUser = async () => {
    createUserWithEmailAndPassword(
      auth,
      registerForm.values.registerEmail,
      registerForm.values.registerPassword
    ).then((res) => {
      console.log(res);
      makeRequest(
        makeCollectionPath(`usersStore`, res.user.accessToken, ""),
        "POST",
        { ...registerForm.values, uid: res.user.uid }
      );
    });
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

  const registerFormRender = useCallback(() => {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Register user form</h2>
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
  }, [registerForm]);

  const loginFormRender = useCallback(() => {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Log in deploy test</h2>
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
  }, [loginForm]);

  return (
    <>
      <div>{loginFormRender()}</div>
      <div>{registerFormRender()}</div>
    </>
  );
};

export default LoginPage;
