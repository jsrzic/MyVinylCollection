import React from "react";

import { Fade } from "@mui/material";

import VinylCard from "../components/VinylCard";
import { IsMobile } from "../util/utils";

function HomePage() {
  const scrollContainerStyle = IsMobile()
    ? {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
      }
    : {
        display: "flex",
        flexWrap: "wrap",
        maxHeight: "90vh",
        overflowY: "scroll",
        justifyContent: "space-between",
      };
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
