import React from "react";

import { Avatar } from "@mui/material";

const userContainerStyle = {
  display: "flex",
  background: "#A68982",
  borderBottomLeftRadius: "1rem",
  borderTopLeftRadius: "1rem",
  margin: "0.8rem",
  marginRight: "0rem",
  padding: "0.5rem",
  alignItems: "center",
};
const avatarStyle = { height: 56, width: 56 };
const usernameStyle = { fontSize: "1.2rem", marginLeft: "1rem" };

function UserTab() {
  return (
    <div style={userContainerStyle}>
      <Avatar alt="user" sx={avatarStyle}>
        U
      </Avatar>
      <p style={usernameStyle}>username</p>
    </div>
  );
}

export default UserTab;
