import React from "react";

import { Paper, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { getCurrentUser, getRandomColor, IsMobile } from "../util/utils";
import VinylComponent from "./AdComponent";
import { useHistory } from "react-router-dom";
import authHeader from "../auth-header";

function VinylInfoHeader({ vinyl }) {
  const api = process.env.REACT_APP_API_URL;

  const username = getCurrentUser();
  const vinylDimension = IsMobile() ? 75 : 150;
  const color = getRandomColor();
  const history = useHistory();
  let pressed = false;

  function deleteVinyl() {
    pressed = true;
    fetch(api + "/vinyls/collection", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
        "Content-Type": "application/json",
      },
    }).then((r) =>
      r.json().then((data) => {
        const id = Number(data.filter((d) => d.album === vinyl.album)[0].id);
        fetch(api + `/vinyls/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authHeader(),
          },
        }).then((r) => r.json().then((d) => console.log(d.message)));
      })
    );
    setTimeout(() => {
      history.push("/dashboard/collection");
    }, 200);
  }

  const infoStyleDesktop = {
    background: color,
    margin: "2rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
  };

  const infoStyleMobile = {
    background: color,
    width: "90%",
    margin: "auto",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <Paper style={IsMobile() ? infoStyleMobile : infoStyleDesktop}>
      <div style={{ display: "flex" }}>
        <VinylComponent size={vinylDimension} disabled />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ marginLeft: "1rem" }}>{vinyl && vinyl.album}</h1>
          <h2 style={{ marginLeft: "1rem" }}>{username}</h2>
        </div>
      </div>
      <Tooltip title="Delete Vinyl">
        <DeleteIcon
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={() => {
            deleteVinyl(vinyl);
          }}
        />
      </Tooltip>
    </Paper>
  );
}

export default VinylInfoHeader;
