import React from "react";

import { Avatar, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const headerStyle = {
  background: "#d59a88",
  margin: "2rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
};

function ProfileHeader() {
  return (
    <Paper style={headerStyle}>
      <div style={{ display: "flex" }}>
        <Avatar sx={{ width: "200px", height: "200px" }} />
        <h1 style={{ marginLeft: "2rem" }}>Username</h1>
      </div>
      <div>
        <Button variant="contained" endIcon={<AddIcon />}>
          Follow
        </Button>
      </div>
    </Paper>
  );
}

export default ProfileHeader;
