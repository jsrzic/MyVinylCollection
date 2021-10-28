import React from "react";
import { pageStyle } from "../styles/globalStyles";
import signupImg from "../assets/signup.png";
import Form from "../components/Form";

function SignUpPage() {
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
      <img src={signupImg} style={imageStyle} alt="login_image" />
      <Form style={formStyle}>
        <Form.Row label="e-mail" type="text" />
        <Form.Row label="Password" type="text" />
        <Form.Submit />
      </Form>
    </div>
  );
}

export default SignUpPage;
