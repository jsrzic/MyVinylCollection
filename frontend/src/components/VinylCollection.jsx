import React, {useState} from "react";
import {IsMobile} from "../util/utils";
import VinylCard from "./VinylCard";
import {Fade} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function VinylCollection({data}) {
  // const scrollContainerStyleDesktop = {
  //   display: "grid",
  //   gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  //   justifyContent: "space-between",
  //   maxHeight: "90vh",
  //   overflowY: "scroll",
  //   width: "100%",
  //   paddingRight: "3rem"
  // };

  const [index, setIndex] = React.useState(0);

  const incrementIndex = () => {
    if(index + 4 < data.length){
      setIndex(index + 4);
    }
  }

  const decrementIndex = () => {
    if(index - 4 >= 0){
      setIndex(index - 4);
    }
  }

  return(
    <>
      <ArrowBackIosIcon onClick={decrementIndex} style={{height: "16rem"}}/>
      {data.slice(index, index + 4).map((v) => (
        <VinylCard vinylData={v} />
      ))}
      <ArrowForwardIosIcon onClick={incrementIndex} style={{height: "16rem"}}/>
    </>
  );



}

export default VinylCollection;