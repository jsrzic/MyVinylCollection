import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import { Button, TextField } from "@mui/material";

function ProfilePage() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <ProfileHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            style={{ width: "49%", marginTop: "2rem" }}
            label="Name"
            defaultValue="Lucija"
          />
          <TextField
            style={{ width: "49%", marginTop: "2rem" }}
            label="Surname"
            defaultValue="Aleksić"
          />
        </div>
        <TextField
          style={{ marginTop: "2rem" }}
          label="Location"
          defaultValue="Unska 3, Zagreb"
        />
        <TextField style={{ marginTop: "2rem" }} label="Email" />
        <TextField
          style={{ marginTop: "2rem" }}
          label="Password"
          type="password"
        />

        <div style={{ marginTop: "1rem" }}>
          <Button variant="contained">Update</Button>
          <Button variant="outlined">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
