import React, {useEffect, useState} from 'react';
import authHeader from "../auth-header";
import {Alert, LinearProgress} from "@mui/material";
import ExchangeOffer from "../components/ExchangeOffer";

function InboxPage() {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    fetch(api + "/users/offers", {
      method: "GET",
      headers: {
        Origin: origin,
        Authorization: authHeader()
      }
    }).then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error(response.status);
      }
    }).then(data => {
      console.log(JSON.stringify(data, null, 2));
      setOffers(data);
      setLoading(false);
    }).catch(err => {
      setErrorMessage(true);
      setLoading(false);
      console.log(err);
    });
  }, []);

  return (
    <div style={{marginLeft:"1rem", marginTop:"2rem", width: "100%"}}>
      {loading ? <LinearProgress style={{marginTop: "1rem"}}/> :
        <>
          {
            errorMessage ?
              <Alert variant="outlined" severity="error">Error occurred while communicating with the server.</Alert> :
              <>{offers.length == 0 ? <Alert style={{flexGrow: 1}} variant="outlined" severity="info">Empty inbox.</Alert> :
                offers.map(o => <ExchangeOffer sender={o.senderUsername} offer={o.offer}/>)}
              </>
          }
        </>
      }
    </div>
  );
}

export default InboxPage;