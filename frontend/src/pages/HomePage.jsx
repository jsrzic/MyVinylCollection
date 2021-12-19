import React from "react";

import { Fade } from "@mui/material";

import VinylCard from "../components/VinylCard";
import { IsMobile } from "../util/utils";

function HomePage() {
  const scrollContainerStyleDesktop = {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "90vh",
    overflowY: "scroll",
    justifyContent: "space-between",
  };

  const scrollContainerStyleMobile = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: "100%",
    zoom: `${window.innerWidth / 4}%`,
  };

  return (
    <Fade in>
      <div
        style={
          IsMobile() ? scrollContainerStyleMobile : scrollContainerStyleDesktop
        }
      >
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
