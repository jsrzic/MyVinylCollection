import React from "react";

import { Fade } from "@mui/material";

import VinylCard from "../components/VinylCard";

const scrollContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  maxHeight: "90vh",
  overflowY: "scroll",
  justifyContent: "space-between",
};

function HomePage() {
  return (
    <Fade in>
      <div style={scrollContainerStyle}>
        {/*mock*/}
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
    </Fade>
  );
}

export default HomePage;
