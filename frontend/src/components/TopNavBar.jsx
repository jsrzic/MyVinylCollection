import React from "react";

import {
  AppBar,
  Button,
  Grow,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import ToggleTheme from "./ToggleTheme";
import icon from "../assets/icon.png";
import { IsMobile } from "../util/utils";

function TopNavBar({ colorMode, theme }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AppBar>
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={icon}
              alt="icon"
              style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
            />
            <h2 style={{ fontSize: "1.2rem" }}>My Vinyl Collection</h2>
          </div>
          <div>
            <ToggleTheme colorMode={colorMode} theme={theme} />
            {IsMobile() ? (
              <IconButton onClick={() => setOpen(!open)}>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            ) : (
              <>
                <Button
                  style={{ marginInline: "1rem" }}
                  variant="contained"
                  startIcon={<LogoutIcon />}
                >
                  Log out
                </Button>
                <TextField
                  variant="filled"
                  hiddenLabel
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <IconButton disableTouchRipple>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </>
            )}
          </div>
        </Toolbar>
        <Grow in={open}>
          <AppBar style={{ marginTop: "4rem" }}>
            <Toolbar
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                variant="filled"
                hiddenLabel
                size="small"
                InputProps={{
                  startAdornment: (
                    <IconButton disableTouchRipple>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
              <Button variant="contained" startIcon={<LogoutIcon />}>
                Log out
              </Button>
            </Toolbar>
          </AppBar>
        </Grow>
      </AppBar>
    </>
  );
}

export default TopNavBar;
