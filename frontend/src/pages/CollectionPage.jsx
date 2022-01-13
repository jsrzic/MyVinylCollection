import React, {useEffect, useState} from "react";
import VinylCollection from "../components/VinylCollection";
import {Alert, Autocomplete, Button, Card, Divider, Fade, TextField} from "@mui/material";
import {getRandomColor, IsMobile} from "../util/utils";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const collectionStyle = {
    display: "flex"
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
  const [isSubcollectionRemoved, setIsSubcollectionRemoved] = React.useState(false);
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
  }, [isAdded, isSubcollectionRemoved]);

  React.useEffect(() => {
    const subCollectionArtists = subcollections.map(v => v.name);
    setArtists(mainCollection.filter(a => !subCollectionArtists.includes(a.artist.name)));
  }, [mainCollection, subcollections]);


  const handleDelete = (artistName) => {
      let artistId = mainCollection.filter(v => v.artist.name == artistName)[0].artist.id;
      fetch(api + `/vinyls/subcollection/${artistId}`, {
        method: "DELETE",
        headers: {
          Authorization: authHeader(),
          Origin: origin
        },
      })
        .then(response => {
          if(response.ok){
            setIsSubcollectionRemoved(!isSubcollectionRemoved);
          }
          else {
            throw new Error(response.status);
          }
        })
        .catch(err => console.log(err));
  };

  const history = useHistory();
  const addNewVinylCard =
    <Card style={cardStyle} onClick={() => history.push("/dashboard/add-vinyl")}>
      <AddIcon style={{width: "100px", height: "100px"}}/>
      <h2>Add new Vinyl</h2>
    </Card>;

  return (
    <div style={{flexGrow: 1}}>
      {errorMessage ? <h1>User not authorized.</h1> :
      <div>
        <Divider style={{marginTop: "1rem"}} textAlign="left"><h1>ALL VINYLS</h1></Divider>
        <Fade in>
          <div style={collectionStyle}>
            {addNewVinylCard}
            {mainCollection.length > 0 ? <VinylCollection data={mainCollection} favVinyls={favVinyls} updateFunction={setFavVinyls}/> : <Alert variant="outlined" severity="info">No vinyls in this collection.</Alert>}
          </div>
        </Fade>

        <Divider style={{marginTop: "4rem"}} textAlign="left"><h1>SUB-COLLECTIONS</h1></Divider>
        <PickArtistForm updateFunction={() => setIsAdded(!isAdded)} data={artists}/>
        {subcollections.length > 0 ? subcollections.map(subc =>
          <>
            <h2>{subc.name}</h2>
            {subc.items.length > 0 ? <VinylCollection data={subc.items} favVinyls={favVinyls} updateFunction={setFavVinyls}/> : <Alert variant="outlined" severity="info">No vinyls in this collection.</Alert>}
            <Button style={{margin: "1rem 0 4rem 2rem"}} variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(subc.name)}>
              Delete sub-collection
            </Button>
          </>
        ) : <h1>No subcollections.</h1>}

        <Divider style={{marginTop: "4rem"}} textAlign="left"><h1>FAVOURITES</h1></Divider>
        {favVinyls.length > 0 ? <VinylCollection data={favVinyls} favVinyls={favVinyls} updateFunction={setFavVinyls}/> : <Alert variant="outlined" severity="info">No vinyls in this collection.</Alert>}
      </div>
      }
    </div>
  );
}

export default CollectionPage;