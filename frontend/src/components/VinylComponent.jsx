import React from "react";

import { getRandomColor } from "../util/utils";

const flexedCenterStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function VinylComponent({ size, name }) {
  const containerStyle = {
    background: "rgb(33,33,33)",
    borderRadius: size,
    width: size,
    height: size,
  };
  const vinylStyle = {
    borderRadius: size,
    height: 0.5 * size,
    width: 0.5 * size,
    background: getRandomColor(),
  };

  return (
    <div style={{ ...containerStyle, ...flexedCenterStyle }}>
      <div style={{ ...vinylStyle, ...flexedCenterStyle }}>
        <p align="center">{name}</p>
      </div>
    </div>
  );
}

export default VinylComponent;
