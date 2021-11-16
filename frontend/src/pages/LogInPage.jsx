import React from "react";
import { pageStyle } from "../styles/globalStyles";
import logoImg from "../assets/login.png";
import { Formik } from "formik";
import Button from "@mui/material/Button";

import Form from "../components/Form";

function LogInPage() {
  const loginPageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const imageStyle = {
    position: "absolute",
    bottom: "-20%",
    animation: "floatUp 1s",
    zIndex: 0,
  };

  const formStyle = {
    animation: "fadeIn 4s",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const btnStyle = {
    width: "50%",
    margin: "auto",
  };

  return (
    <div style={{ ...pageStyle, ...loginPageStyle }}>
      <img src={logoImg} style={imageStyle} alt="login_image" />
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values }, null, 2),
          };
          fetch("http://localhost:8080/users/login", requestOptions)
            .then((response) => {
              console.log(response.json());
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {(formik) => {
          return (
            <Form style={formStyle}>
              <Form.Row
                label="Username"
                type="text"
                value={formik.values.username}
                name="username"
                onChange={formik.handleChange}
                required
              />
              <Form.Row
                label="Password"
                type="password"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                required
              />
              <Button onClick={formik.handleSubmit} style={btnStyle}>
                Log in
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LogInPage;
