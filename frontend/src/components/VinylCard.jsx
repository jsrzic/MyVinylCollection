import React from "react";

import { Card, Chip, IconButton } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import VinylComponent from "./VinylComponent";
import { getRandomColor, IsMobile } from "../util/utils";

function VinylCard({ vinylData }) {
  const cardDimension = IsMobile() ? 100 : 200;
  const vinylDimension = IsMobile() ? 75 : 150;

  const cardStyle = {
    background: getRandomColor(),
    width: cardDimension,
    minHeight: cardDimension,
    height: "12rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem",
    flexDirection: "column",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "relative",
    justifySelf: "center"
  };
  const saleHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: "-1rem",
    position:"absolute",
    top: "1.3rem"
  };

  return (
    <Card style={cardStyle}>
      {vinylData.forSale && (
        <div style={saleHeaderStyle}>
          <IconButton size="small" disabled style={{ background: "green" }}>
            <AttachMoneyIcon />
          </IconButton>
          <FavoriteBorderIcon />
        </div>
      )}
      <VinylComponent size={vinylDimension} name={vinylData.name} />
      {vinylData.ad && (
        <Chip variant="filled" label="kupljen" style={{ marginTop: "1rem" }} />
      )}
    </Card>
  );
}

export default VinylCard;
