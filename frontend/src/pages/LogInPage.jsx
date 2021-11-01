import React from "react";
import { pageStyle } from "../styles/globalStyles";
import logoImg from "../assets/login.png";
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
  };

  const formStyle = {
    animation: "fadeIn 4s",
  };

  return (
    <div style={{ ...pageStyle, ...loginPageStyle }}>
      <img src={logoImg} style={imageStyle} alt="login_image" />
      <Form style={formStyle}>
        <Form.Row label="e-mail" />
        <Form.Row label="Password" type="password" />
        <Form.Submit />
      </Form>
    </div>
  );
}

export default LogInPage;
