import React from "react";
import {IsMobile} from "../util/utils";
import VinylCard from "./VinylCard";
import {Fade} from "@mui/material";

function VinylCollection({data, initialCard}) {
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

  return <Fade in>
    <div
      style={
        IsMobile() ? scrollContainerStyleMobile : scrollContainerStyleDesktop
      }
    >
      {data.map((v) => (
        <VinylCard vinylData={v} />
      ))}
    </div>
  </Fade>;
}

export default VinylCollection;