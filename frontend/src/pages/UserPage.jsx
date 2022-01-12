import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import authHeader from "../auth-header";
import ProfileHeader from "../components/ProfileHeader";
import VinylCollection from "../components/VinylCollection";
import {Alert, LinearProgress} from "@mui/material";

function UserPage() {
  const api = process.env.REACT_APP_API_URL;
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [favVinyls, setFavVinyls] = useState([]);
  const [errorMessage, setErrorMessage] = React.useState(false);


  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: authHeader(),
      Origin: origin
    },
  };

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
      .catch(err => {
        setErrorMessage(true);
        console.log(err);
      });

  }, []);


  React.useEffect(() => {
    fetch(api + `/users/profile/${params.username}`, requestOptions)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        else {
          throw new Error(response.status);
        }
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setErrorMessage(true);
        console.log(err);
      });

  }, []);


  const containerStyle = {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: "100%",
  };

  return (
    <div style={containerStyle}>
      {loading ? <LinearProgress style={{marginTop: "1rem"}}/> :
        (errorMessage ? <Alert variant="outlined" severity="error">Error occurred while communicating with the server.</Alert> :
            <>
              <ProfileHeader username={data.username} />
              <h2>Contact Mail: {data.contactEmail}</h2>
              <h2>Location: {data.location ? data.location.city : "unknown"}</h2>
              <h2>{data.username}'s collection:</h2>
              {data.vinyls.length > 0 ? <VinylCollection data={data.vinyls} favVinyls={favVinyls} updateFunction={setFavVinyls}/> : <Alert variant="outlined" severity="info">No vinyls in this collection.</Alert>}
            </>
        )
      }

    </div>
  );
}

export default UserPage;