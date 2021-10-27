import React from "react";
import vinyl from "../assets/vinyl.png";
import "../index.css";
import Button from "../components/Button";
import { IsMobile } from "../util/utils";
import { pageStyle } from "../styles/globalStyles";

function Homepage() {
  const homepageStyle = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    background: "linear-gradient(45deg, #FF9648, #FF6587)",
    position: "relative",
  };

  const homepageHeaderStyle = IsMobile()
    ? {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }
    : {
        width: "95%",
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between",
        margin: "1rem",
      };

  const imageStyle = {
    animation: "rotation 20s infinite linear",
    position: "absolute",
    bottom: "-55%",
  };

  const titleStyle = {
    fontSize: "5rem",
    margin: 0,
  };

  return (
    <div style={{ ...pageStyle, ...homepageStyle }}>
      <div style={homepageHeaderStyle}>
        <h1 style={titleStyle}>My Vinyl Collection</h1>
        <div style={{ display: "flex" }}>
          <Button variant="primary" text="Log In" path="/login" />
          <Button variant="secondary" text="Sign Up" path="/signup" />
        </div>
      </div>
      <img style={imageStyle} alt="vinyl" src={vinyl} />
    </div>
  );
}

export default Homepage;
