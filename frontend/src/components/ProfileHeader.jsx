import React from "react";

import { Avatar, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {getCurrentUser, IsMobile} from "../util/utils";

const headerStyleDesktop = {
  background: "#d59a88",
  margin: "2rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};
const headerStyleMobile = {
  background: "#d59a88",
  width: "90%",
  margin: "auto",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};
const avatarStyleDesktop = {
  width: "150px",
  height: "150px",
  fontSize: "75px",
};
const avatarStyleMobile = {
  width: "75px",
  height: "75px",
  fontSize: "30px",
};

function ProfileHeader() {
  const username = getCurrentUser();

  return (
    <Paper style={IsMobile() ? headerStyleMobile : headerStyleDesktop}>
      <div style={{ display: "flex" }}>
        <Avatar sx={IsMobile() ? avatarStyleMobile : avatarStyleDesktop}>
          {username.substring(0, 1).toUpperCase()}
        </Avatar>
        <h1 style={{ marginLeft: "1rem" }}>{username}</h1>
      </div>
      <div>
        <Button variant="contained" size="small" endIcon={<AddIcon />}>
          Follow
        </Button>
      </div>
    </Paper>
  );
}

export default ProfileHeader;
