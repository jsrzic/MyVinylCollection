import React, {useEffect, useState} from "react";
import VinylCard from "./VinylCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function VinylCollection({data, favVinyls, updateFunction}) {
  const api = process.env.REACT_APP_API_URL;

  const [index, setIndex] = useState(0);

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
        <VinylCard vinylData={v} favVinyls={favVinyls} updateFunction={updateFunction}/>
      ))}
      <ArrowForwardIosIcon onClick={incrementIndex} style={{height: "16rem"}}/>
    </>
  );



}

export default VinylCollection;