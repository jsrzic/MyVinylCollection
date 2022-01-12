import React from 'react';
import {useLocation} from "react-router-dom";
import FriendListItem from "../components/FriendListItem";
import {Alert} from "@mui/material";

function SearchResultPage() {
  const location = useLocation();

  return (
    <div style={{flexGrow: 1}}>
      <h1>Search results</h1>
      {location.state.data.length > 0 ? (
        location.state.data.map(u => <div style={{marginTop: "2rem"}}><FriendListItem userData={null} username={u}/></div>)
      ) : <Alert style={{margin: "1rem"}} variant="outlined" severity="info">No users match the search pattern.</Alert>}
    </div>
  );
}

export default SearchResultPage;