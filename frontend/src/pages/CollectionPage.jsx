import React, {useEffect, useState} from "react";
import VinylCollection from "../components/VinylCollection";
import {Autocomplete, Card, Fade, TextField} from "@mui/material";
import {getRandomColor, IsMobile} from "../util/utils";
import AddIcon from '@mui/icons-material/Add';
import {useHistory} from "react-router-dom";
import PickArtistForm from "../components/PickArtistForm";
import authHeader from "../auth-header";

function CollectionPage() {
  const cardDimension = IsMobile() ? 100 : 200;
  const vinylDimension = IsMobile() ? 75 : 150;

  const cardStyle = {
    background: "#D59A88",
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

  const scrollContainerStyleDesktop = {
    maxHeight: "90vh",
    overflowY: "scroll",
  }

  const scrollContainerStyleMobile = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: "100%",
    zoom: `${window.innerWidth / 4}%`,
  };

  const vinylGridStyle = {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto auto auto",
    justifyContent: "space-between",
    paddingRight: "3rem",
  }

  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: authHeader(),
      Origin: origin
    },
  };

  const [errorMessage, setErrorMessage] = React.useState(false);
  const [mainCollection, setMainCollection] = React.useState([]);
  const [subcollections, setSubcollections] = React.useState([]);
  const [artists, setArtists] = React.useState([]);
  const [isAdded, setIsAdded] = React.useState(false);
  const [favVinyls, setFavVinyls] = useState([]);


  React.useEffect(() => {
    fetch(api + "/users/favourites", requestOptions)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        else {
          throw new Error(response.status);
        }
      })
      .then(favVinlys => {
        setFavVinyls(favVinlys);
      })
      .catch(err => console.log(err));

  }, []);

  React.useEffect(() => {
    fetch(api + `/vinyls/collection`, requestOptions)
      .then(response => {
        if(!response.ok){
          setErrorMessage(true);
        }
        return response.json();
      })
      .then(data => {
          setMainCollection(data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      })
  }, [isAdded]);

  React.useEffect(() => {
    fetch(api + `/vinyls/subcollection`, requestOptions)
      .then(response => {
        if(!response.ok){
          setErrorMessage(true);
        }
        return response.json();
      })
      .then(data => {
        setSubcollections(data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      })
  }, [isAdded]);

  React.useEffect(() => {
    const subCollectionArtists = subcollections.map(v => v.name);
    setArtists(mainCollection.filter(a => !subCollectionArtists.includes(a.artist.name)));
  }, [mainCollection, subcollections]);

  const history = useHistory();
  const addNewVinylCard =
    <Card style={cardStyle} onClick={() => history.push("/dashboard/add-vinyl")}>
      <AddIcon style={{width: "100px", height: "100px"}}/>
      <h2>Add new Vinyl</h2>
    </Card>;

  return (
    <>
      {errorMessage ? <h1>User not authorized.</h1> :
      <div>
        <h1>All Vinyls</h1>
        <Fade in>
          <div style={vinylGridStyle}>
            {addNewVinylCard}
            {mainCollection.length > 0 ? <VinylCollection data={mainCollection} favVinyls={favVinyls} updateFunction={setFavVinyls}/> : <h1>No vinyls in this collection.</h1>}
          </div>
        </Fade>
        <h1>SUB-COLLECTIONS</h1>
        <PickArtistForm updateFunction={setIsAdded} data={artists}/>
        {subcollections.length > 0 ? subcollections.map(subc =>
          <>
            <h1>{subc.name}</h1>
            <div style={vinylGridStyle}>
              {subc.items.length > 0 ? <VinylCollection data={subc.items} favVinyls={favVinyls} updateFunction={setFavVinyls}/> : <h1>No vinyls in this collection.</h1>}
            </div>
          </>
        ) : <h1>No subcollections.</h1>}

        <h1>FAVOURITES</h1>
        {favVinyls.length > 0 ? <VinylCollection data={favVinyls} favVinyls={favVinyls} updateFunction={setFavVinyls}/> : <h1>No vinyls in this collection.</h1>}
      </div>
      }
    </>
  );
}

export default CollectionPage;