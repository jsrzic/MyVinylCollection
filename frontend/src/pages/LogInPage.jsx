import React from "react";
import { pageStyle } from "../styles/globalStyles";
import logoImg from "../assets/login.png";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
  };

  const formStyle = {
    animation: "fadeIn 4s",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const textFieldStyle = {
    backgroundColor: "grey",
  };

  const btnStyle = {
    backgroundColor: "white",
  };
  const labelStyle = {
    color: "white",
  };
  return (
    <div style={{ ...pageStyle, ...loginPageStyle }}>
      <img src={logoImg} style={imageStyle} alt="login_image" />

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) errors.email = "Required";
          else if (!values.password) errors.password = "Required";
          return errors;
        }}
      >
        <Form style={formStyle}>
          <label style={labelStyle}>E-mail</label>
          <TextField
            required
            id="email"
            label="Email Address"
            name="email"
            style={textFieldStyle}
          />
          <label style={labelStyle}>Password</label>
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            style={textFieldStyle}
          />
          <Button type="submit" style={btnStyle}>
            OK
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default LogInPage;
