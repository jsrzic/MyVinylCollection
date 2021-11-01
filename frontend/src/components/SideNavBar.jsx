import React from "react";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AlbumIcon from "@mui/icons-material/Album";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";

import { IsMobile } from "../util/utils";
import UserTab from "./UserTab";

function SideNavBar() {
  return !IsMobile() ? (
    <Paper
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Tabs orientation="vertical" style={{ width: "15rem" }}>
        <UserTab />
        <Tab
          style={{ display: "flex", justifyContent: "start" }}
          icon={<HomeIcon />}
          label="Home Page"
          iconPosition="start"
        />
        <Tab
          style={{ display: "flex", justifyContent: "start" }}
          icon={<AlbumIcon />}
          label="Collection"
          iconPosition="start"
        />
        <Tab
          style={{ display: "flex", justifyContent: "start" }}
          icon={<FeaturedPlayListIcon />}
          label="Ads"
          iconPosition="start"
        />
        <Divider />
        <Tab
          style={{ display: "flex", justifyContent: "start" }}
          icon={<SettingsIcon />}
          label="Settings"
          iconPosition="start"
        />
        <Tab
          style={{ display: "flex", justifyContent: "start" }}
          icon={<PeopleIcon />}
          label="Friends"
          iconPosition="start"
        />
      </Tabs>
    </Paper>
  ) : (
    <Box style={{ width: "100%", position: "absolute", bottom: 0 }}>
      <BottomNavigation>
        <BottomNavigationAction icon={<HomeIcon />} label="Home Page" />
        <BottomNavigationAction icon={<FeaturedPlayListIcon />} label="Ads" />
        <BottomNavigationAction icon={<AlbumIcon />} label="Collection" />
        <BottomNavigationAction icon={<SettingsIcon />} label="Settings" />
        <BottomNavigationAction icon={<PeopleIcon />} label="Friends" />
      </BottomNavigation>
    </Box>
  );
}

export default SideNavBar;
