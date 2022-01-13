import React from "react";
import Button from "@mui/material/Button";
import authHeader from "../auth-header";
import AdCard from "../components/AdCard";
import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getCurrentUser, IsMobile } from "../util/utils";
import { useHistory } from "react-router-dom";
import VinylComponent from "../components/VinylComponent";

function AdsPage() {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;

  const [ads, setAds] = React.useState();

  const username = getCurrentUser();

  React.useEffect(() => {
    fetch(api + "/ads/active", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) =>
      r.json().then((data) => {
        setAds(data);
        console.log(data);
      })
    );
  }, []);

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div>
        <h1>Active Ads</h1>
        {ads ? (
          <div style={{ display: "flex" }}>
            <div>
              <AddNewSaleAd setOpen={setOpen} open={open} />
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: window.innerWidth * 0.68,
                height: "20rem",
                overflow: "scroll",
              }}
            >
              {ads.saleAds.map((ad) => (
                <AdCard
                  username={username}
                  price={ad.price}
                  name={ad.vinyl.album}
                  id={ad.vinyl.id}
                  isSale
                />
              ))}
              {ads.exchangeAds.map((ad) => (
                <AdCard
                  username={username}
                  name={ad.vinyl.album}
                  id={ad.vinyl.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h1>Bought Ads</h1>
        <div
          style={{
            display: "flex",
            maxWidth: window.innerWidth * 0.83,
            height: "20rem",
            overflow: "scroll",
          }}
        ></div>
      </div>
      <div>
        <h1>Sold Ads</h1>
        <div
          style={{
            display: "flex",
            maxWidth: window.innerWidth * 0.83,
            height: "20rem",
            overflow: "scroll",
          }}
        ></div>
      </div>
    </>
  );
}

function AddNewSaleAd({ setOpen, open }) {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;

  const [vinyls, setVinyls] = React.useState();
  const [vinyl, setVinyl] = React.useState({});
  const [price, setPrice] = React.useState();

  React.useEffect(() => {
    fetch(api + "/vinyls/collection/ad", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) => r.json().then((data) => setVinyls(data)));
  }, []);

  function postSaleAd() {
    setOpen(false);
    fetch(api + "/ads/sale_ads", {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify({
        price: price,
        vinyl,
      }),
    }).then((r) => console.log(r.json()));
  }
  const cardDimension = IsMobile() ? 100 : 200;

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
    justifySelf: "center",
    cursor: "pointer",
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setVinyl(value);
  };

  return (
    <>
      <Card style={cardStyle} onClick={() => setOpen(true)}>
        <AddIcon style={{ width: "100px", height: "100px" }} />
        <h2>Add new ad</h2>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Sale Ad</DialogTitle>
        <DialogContent>
          {vinyls ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vinyl</InputLabel>
              <Select label="Vinyl" value={vinyl} onChange={handleChange}>
                {vinyls.map((v) => (
                  <MenuItem style={{ height: "3rem" }} value={v}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <VinylComponent size={20} />
                      <p style={{ marginLeft: "10px" }}>{v.album}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Price"
                style={{ marginTop: "10px", marginBottom: "10px" }}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Button variant="contained" onClick={postSaleAd}>
                OK
              </Button>
            </FormControl>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdsPage;
