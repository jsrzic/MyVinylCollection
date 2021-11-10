import React from "react";

import { Paper } from "@mui/material";

import TopNavBar from "../components/TopNavBar";
import SideNavBar from "../components/SideNavBar";
import VinylCard from "../components/VinylCard";

const subScreenStyle = {
  display: "flex",
  marginTop: "4rem",
  height: "100%",
};
const scrollContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  maxHeight: "90vh",
  overflowY: "scroll",
  justifyContent: "space-between",
};

function Dashboard() {
  return (
    <Paper
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <TopNavBar />
      <div style={subScreenStyle}>
        <SideNavBar />
        <div style={scrollContainerStyle}>
          <VinylCard name="Euforija" forSale />
          <VinylCard name="Bohemian Rhapsody" forSale />
          <VinylCard name="Dugo neko ime" ad />
          <VinylCard name="Ime" forSale />
          <VinylCard name="Ime" />
          <VinylCard name="Ime ime" ad />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
          <VinylCard name="Ime" />
        </div>
      </div>
    </Paper>
  );
}

export default Dashboard;
