import React from 'react';
import {Avatar, Paper} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useHistory} from "react-router-dom";

function FriendListItem({userData, username}) {
  const history = useHistory();

  const paperStyle = {
    backgroundColor: "#5ea99b",
    width: "88%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between"
  }

  const avatarStyle = {
    height: "75px",
    width: "75px",
  }

  const handleClick = () => {
    history.push(`/dashboard/users/${username}`);
  }
  return (
    <div onClick={handleClick}>
        <Paper variant="outlined" style={paperStyle} elevation={10}>
            <div style={{display: "flex", margin: "10px"}}>
              <Avatar style={avatarStyle}></Avatar>
              <div style={{display:"flex", flexDirection: "column", textAlign: "start", marginLeft: "1rem"}}>
                {userData == null ? <h2>{username}</h2> : (
                  <>
                    <h2 style={{margin: 0}}>{userData.name}</h2>
                    <h4 style={{margin: 0}}>Username: {userData.username}</h4>
                    <h4 style={{margin: 0}}>Contact: {userData.contactEmail}</h4>
                  </>
                )}
              </div>
            </div>
            <ArrowForwardIosIcon style={{marginTop: "auto", marginBottom: "auto", marginRight: "1rem"}}/>
        </Paper>
    </div>
  );
}

export default FriendListItem;