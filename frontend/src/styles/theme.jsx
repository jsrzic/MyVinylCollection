import React from "react";
import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "rgb(213,212,212)",
    },
    secondary: {
      main: "rgb(164,164,164)",
    },
    mode: "light",
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            background: "rgb(42,42,42)",
            "&:hover": {
              background: "rgb(73,73,73)",
            },
            color: "white",
          },
        },
      ],
    },
  },
});

export const themeDark = createTheme({
  palette: {
    primary: {
      main: "rgb(213,212,212)",
    },
    secondary: {
      main: "rgb(164,164,164)",
    },
    mode: "dark",
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            background: "rgb(42,42,42)",
            "&:hover": {
              background: "rgb(73,73,73)",
            },
            color: "white",
          },
        },
      ],
    },
  },
});
