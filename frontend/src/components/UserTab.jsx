import React from "react";

import { Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";

const userContainerStyle = {
  display: "flex",
  background: "#d59a88",
  borderBottomLeftRadius: "1rem",
  borderTopLeftRadius: "1rem",
  margin: "0.8rem",
  marginRight: "0rem",
  padding: "0.5rem",
  alignItems: "center",
  cursor: "pointer",
};
const avatarStyle = { height: 56, width: 56 };
const usernameStyle = { fontSize: "1.2rem", marginLeft: "1rem" };

function UserTab() {
  const history = useHistory();

  return (
    <div
      style={userContainerStyle}
      onClick={() => history.push("/dashboard/profile")}
    >
      <Avatar alt="user" sx={avatarStyle}>
        U
      </Avatar>
      <h4 style={usernameStyle}>username</h4>
    </div>
  );
}

export default UserTab;
