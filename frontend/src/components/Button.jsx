import React from "react";
import { useHistory } from "react-router-dom";

const buttonStyle = {
  height: "2.5rem",
  width: "7rem",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  margin: "0.5rem",
};

const primaryVariantStyle = {
  background: "rgb(0, 0, 0)",
  color: "white",
};

const secondaryVariantStyle = {
  background: "rgb(255,255,255)",
};

const textStyle = {
  fontWeight: 700,
};

function Button({ text, variant, path }) {
  let history = useHistory();

  const handleClick = () => {
    history.push(path);
  };

  return (
    <div
      style={
        variant === "primary"
          ? { ...buttonStyle, ...primaryVariantStyle }
          : { ...buttonStyle, ...secondaryVariantStyle }
      }
      onClick={handleClick}
    >
      <p style={textStyle}>{text}</p>
    </div>
  );
}

export default Button;
