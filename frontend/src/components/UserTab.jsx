import React from "react";

import { Avatar } from "@mui/material";

function UserTab() {
  return (
    <div
      style={{
        display: "flex",
        background: "#A68982",
        borderBottomLeftRadius: "1rem",
        borderTopLeftRadius: "1rem",
        marginLeft: "0.8rem",
        marginTop: "0.8rem",
        padding: "0.5rem",
        alignItems: "center",
      }}
    >
      <Avatar alt="user" sx={{ height: 56, width: 56 }}>
        U
      </Avatar>
      <p style={{ fontSize: "1.2rem", marginLeft: "1rem" }}>username</p>
    </div>
  );
}

export default UserTab;
