import React, {useEffect, useState} from "react";

import { Card, Chip, IconButton } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import VinylComponent from "./VinylComponent";
import { getRandomColor, IsMobile } from "../util/utils";
import authHeader from "../auth-header";
import {useHistory} from "react-router-dom";

function VinylCard({ vinylData, favVinyls, updateFunction}) {
  const api = process.env.REACT_APP_API_URL;

  const history = useHistory()

  const cardDimension = IsMobile() ? 100 : 200;
  const vinylDimension = IsMobile() ? 75 : 150;
  const [color, setColor] = useState(getRandomColor());

  const cardStyle = {
    background: color,
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


  const toggleFavourite = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: authHeader(),
        Origin: origin
      },
    };
    fetch(api + `/users/favourites/${vinylData.id}`, requestOptions)
      .then(response => {
        if(!response.ok){
          throw new Error(response.status);
        }

        if(favVinyls.map(v => v.id).includes(vinylData.id)){
          let array = [...favVinyls];
          array.splice(array.findIndex(e => (e.id == vinylData.id)), 1);
          updateFunction(array);
        } else {
          let array = [...favVinyls];
          array.push(vinylData)
          updateFunction(array);
        }


      })
      .catch(err => console.log(err));
  }

  return (
    <Card style={cardStyle} onClick={() => history.push("/vinyl/info")}>
      <div style={saleHeaderStyle}>
        {favVinyls.map(v => v.id).includes(vinylData.id) ? <FavoriteIcon onClick={toggleFavourite}/> : <FavoriteBorderIcon onClick={toggleFavourite}/>}
      </div>
      <VinylComponent size={vinylDimension} name={vinylData.album} />
    </Card>
  );
}

export default VinylCard;
