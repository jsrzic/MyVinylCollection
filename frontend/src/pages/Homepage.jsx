import React from "react";
import vinyl from "../assets/vinyl.png";
import "../index.css";
import Button from "../components/Button";
import { useWindowSize } from "../util/utils";

function Homepage() {
  const homepageStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    background: "linear-gradient(45deg, #FF9648, #FF6587)",
    position: "relative",
  };

  const homepageHeaderStyle =
    useWindowSize().width > 768
      ? {
          width: "95%",
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          margin: "1rem",
        }
      : {
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
    <div style={homepageStyle}>
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
