import React from "react";

import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

import authHeader from "../auth-header";

function AdminUsers() {
  const api = process.env.REACT_APP_API_URL;
  const [users, setUsers] = React.useState();
  const [blockedUsers, setBlockedUsers] = React.useState();

  React.useEffect(() => {
    fetch(api + "/users", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
      },
    }).then((response) =>
      response.json().then((d) => {
        console.log(d);
        setUsers(d);
        // setBlockedUsers(d.filter((u) => u));
      })
    );
  }, []);

  return (
    <List
      sx={{
        width: "70%",
        margin: "auto",
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: "70%",
      }}
    >
      {users &&
        users.map(
          (user) =>
            user.username !== "admin" && (
              <>
                <AdminUserTab name={user.username} />
                <Divider variant="inset" component="li" />
              </>
            )
        )}
    </List>
  );
}

function AdminUserTab({ name, isBlocked }) {
  return (
    <ListItem disabled>
      <ListItemAvatar>
        <Avatar>{isBlocked && <BlockIcon color="error" />}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
      <Button>UNBLOCK</Button>
    </ListItem>
  );
}

export default AdminUsers;
