import React from "react";

import { Avatar, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getCurrentUser, getRandomColor, IsMobile } from "../util/utils";
import VinylComponent from "./AdComponent";

function VinylInfoHeader({ albumName }) {
  const username = getCurrentUser();
  const vinylDimension = IsMobile() ? 75 : 150;
  const color = getRandomColor();

  const infoStyleDesktop = {
    background: color,
    margin: "2rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
  };

  const infoStyleMobile = {
    background: color,
    width: "90%",
    margin: "auto",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <Paper style={IsMobile() ? infoStyleMobile : infoStyleDesktop}>
      <div style={{ display: "flex" }}>
        <VinylComponent size={vinylDimension} disabled />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ marginLeft: "1rem" }}>{albumName}</h1>
          <h2 style={{ marginLeft: "1rem" }}>{username}</h2>
        </div>
      </div>
      <div></div>
    </Paper>
  );
}

export default VinylInfoHeader;
