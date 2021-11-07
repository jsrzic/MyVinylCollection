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

const tabsStyle = { width: "15rem" };
const bottomNavStyle = { width: "100%", position: "absolute", bottom: 0 };
const tabStyle = {
  display: "flex",
  justifyContent: "start",
  margin: "0.5rem",
  borderRadius: "0.5rem",
};

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
      <Tabs orientation="vertical" style={tabsStyle}>
        <UserTab />
        <Divider />
        <Tab
          style={tabStyle}
          icon={<HomeIcon />}
          label="Home Page"
          iconPosition="start"
        />
        <Tab
          style={tabStyle}
          icon={<AlbumIcon />}
          label="Collection"
          iconPosition="start"
        />
        <Tab
          style={tabStyle}
          icon={<FeaturedPlayListIcon />}
          label="Ads"
          iconPosition="start"
        />
        <Divider />
        <Tab
          style={tabStyle}
          icon={<SettingsIcon />}
          label="Settings"
          iconPosition="start"
        />
        <Tab
          style={tabStyle}
          icon={<PeopleIcon />}
          label="Friends"
          iconPosition="start"
        />
      </Tabs>
    </Paper>
  ) : (
    <Box style={bottomNavStyle}>
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
