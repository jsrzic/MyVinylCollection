import React from "react";

import ProfileHeader from "../components/ProfileHeader";

import { Autocomplete, Button, LinearProgress, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import {getCurrentUser, IsMobile} from "../util/utils";
import authHeader from "../auth-header";

const infoContainerStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  marginTop: "1rem",
  border: "rgb(164,164,164) solid 0.3px",
  borderRadius: "5px",
  padding: "1rem",
};
const containerStyle = {
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  maxWidth: "100%",
};

function ProfilePage() {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;
  const mobile = IsMobile();
  const [username, setUsername] = React.useState(
      getCurrentUser()
  );
  const [data, setData] = React.useState({});
  const [editingMode, setEditingMode] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [location, setLocation] = React.useState();
  const [country, setCountry] = React.useState();
  const [city, setCity] = React.useState();
  const [email, setEmail] = React.useState();
  const [contactEmail, setContactEmail] = React.useState();
  const [password, setPassword] = React.useState();

  React.useEffect(() => {
    fetch(api + `/users/info/${username}`, {
      method: "GET",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
      },
    }).then((response) => {
      response.json().then((result) => setData(result));
    });
  }, [api, username]);

  React.useEffect(() => {
    if (loading) {
      setName(data.name);
      setSurname(data.surname);
      setLocation(data.location);
      setEmail(data.email);
      setContactEmail(data.contactEmail);
      setPassword(data.password);
      setTimeout(() => setLoading(false), 500);
    } else {
      localStorage.setItem("username", username);
      fetch(api + `/users/info/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify(data),
      }).then((r) => r.json());
    }
  }, [data]);

  React.useEffect(() => {
    if (data.location !== undefined) {
      setCountry(data.location.substr(0, data.location.indexOf(",")));
      setCity(
        data.location.substr(
          data.location.indexOf(",") + 2,
          data.location.length
        )
      );
    }
  }, [data.location]);

  const [countryData, setCountryData] = React.useState({});
  let c = [];
  const [countries, setCountries] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  React.useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries", {
      method: "GET",
    })
      .then(async (response) => {
        setCountryData(await response.json());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    if (countryData.data !== undefined)
      countryData.data.forEach((d) => c.push(d.country));
    setCountries(c);
  }, [countryData]);

  function saveChanges() {
    setEditingMode(false);
    localStorage.setItem("username", username);
    setData({
      name: name,
      surname: surname,
      username: username,
      location: `${country}, ${city}`,
      email: email,
      password: password,
    });
  }

  function cancelChanges() {
    setName(data.name);
    setSurname(data.surname);
    setUsername(data.username);
    setLocation(data.location);
    setEmail(data.email);
    setPassword(data.password);
    setEditingMode(false);
  }

  function handleCountryChange(value) {
    setCities([]);
    setCountry(value);
    setCity("");
    setCities(
      countryData.data.filter((data) => {
        return data.country === value;
      })[0].cities
    );
  }

  return (
    <div
      style={
        mobile ? { ...containerStyle, marginBottom: "4rem" } : containerStyle
      }
    >
      <ProfileHeader />
      {loading ? (
        <LinearProgress />
      ) : (
        <div
          style={
            mobile
              ? { ...infoContainerStyle, width: "80%" }
              : { ...infoContainerStyle, width: "65%" }
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              style={{ width: "49%", marginTop: "2rem" }}
              label="Name"
              value={name}
              disabled={!editingMode}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ width: "49%", marginTop: "2rem" }}
              label="Surname"
              disabled={!editingMode}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <TextField
            style={{ marginTop: "2rem" }}
            label="Username"
            disabled={!editingMode}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{ marginTop: "2rem" }}
            label="e-mail"
            disabled={!editingMode}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ marginTop: "2rem" }}
            label="Contact e-mail"
            disabled={!editingMode}
            value={contactEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ marginTop: "2rem" }}
            label="Password"
            type="password"
            disabled={!editingMode}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Autocomplete
            style={{ marginTop: "2rem" }}
            value={country}
            disabled={!editingMode}
            renderInput={(params) => (
              <TextField {...params} autoComplete="off" label="Country" />
            )}
            options={countries}
            onChange={(event, value) => handleCountryChange(value)}
          />

          <Autocomplete
            style={{ marginTop: "2rem" }}
            value={city}
            disabled={!editingMode}
            renderInput={(params) => (
              <TextField {...params} autoComplete="off" label="City" />
            )}
            options={cities}
            onChange={(event, value) => setCity(value)}
          />

          <div style={{ marginTop: "1rem" }}>
            {editingMode ? (
              <>
                <Button variant="contained" onClick={cancelChanges}>
                  Cancel
                </Button>
                <Button variant="outlined" onClick={saveChanges}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setEditingMode(true)}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
