import React from "react";

import { useHistory } from "react-router-dom";

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
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";

import { IsMobile, ThemeContext } from "../util/utils";
import UserTab from "./UserTab";

const tabsIcons = [
  <HomeIcon />,
  <AlbumIcon />,
  <FeaturedPlayListIcon />,
  <EmailIcon />,
  <PeopleIcon />,
];
const tabs = ["Home Page", "Collection", "Ads", "Inbox", "Friends"];
const tabToPath = new Map();
tabToPath.set("Home Page", "homepage");
tabToPath.set("Collection", "collection");
tabToPath.set("Ads", "ads");
tabToPath.set("Inbox", "inbox");
tabToPath.set("Friends", "friends");

function SideNavBar() {
  const url = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const [active, setActive] = React.useState(url);

  const { theme } = React.useContext(ThemeContext);

  const color =
    theme.palette.mode === "dark" ? "rgb(44,44,44)" : "rgb(222,222,222)";

  const tabStyle = {
    display: "flex",
    justifyContent: "start",
    margin: "0.5rem",
    marginRight: "0",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  };
  const activeTabStyle = {
    display: "flex",
    justifyContent: "start",
    margin: "0.5rem",
    marginRight: "0",
    fontWeight: "750",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
    fontSize: "17px",
    animation: "grow 0.15s",
    background: color,
  };
  const tabsStyle = { width: "15rem" };
  const bottomNavStyle = {
    width: "100%",
    position: "absolute",
    bottom: 0,
    zoom: `${window.innerWidth / 4}%`,
    zIndex: 2,
  };

  const history = useHistory();

  function isActive(tab) {
    return tab === active;
  }

  return !IsMobile() ? (
    <Paper
      variant="outlined"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Tabs
        orientation="vertical"
        style={tabsStyle}
        value={
          [...tabToPath.values()].indexOf(url) === -1
            ? false
            : [...tabToPath.values()].indexOf(url)
        }
      >
        <UserTab />
        <Divider />
        {tabs.map((tab, index) => (
          <Tab
            label={<p>{tabs[index]}</p>}
            value={index}
            style={isActive(tabToPath.get(tab)) ? activeTabStyle : tabStyle}
            onClick={() => {
              setActive(tabToPath.get(tabs[index]));
              history.push(`/dashboard/${tabToPath.get(tabs[index])}`);
            }}
            icon={tabsIcons[index]}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Paper>
  ) : (
    <Box style={bottomNavStyle}>
      <BottomNavigation>
        <BottomNavigationAction icon={<HomeIcon />} label="Home Page" />
        <BottomNavigationAction icon={<FeaturedPlayListIcon />} label="Ads" />
        <BottomNavigationAction icon={<AlbumIcon />} label="Collection" />
        <BottomNavigationAction icon={<EmailIcon />} label="Inbox" />
        <BottomNavigationAction icon={<PeopleIcon />} label="Friends" />
      </BottomNavigation>
    </Box>
  );
}

export default SideNavBar;
