import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { alpha, createTheme } from "@mui/material";

import { ThemeProvider } from "@emotion/react";

import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { ColorModeContext } from "./util/utils";

function Routes() {
  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const contrast = mode === "dark" ? "rgb(35,35,35)" : "rgb(196,196,196)";
  const color = mode === "dark" ? "rgb(196,196,196)" : "rgb(35,35,35)";

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "rgb(213,212,212)",
            dark: "rgb(24,24,24)",
            light: "rgb(24,24,24)",
          },
          secondary: {
            main: "rgb(164,164,164)",
          },
          mode,
        },
        components: {
          MuiButton: {
            variants: [
              {
                props: { variant: "contained" },
                style: {
                  background: "rgb(33,33,33)",
                  "&:hover": {
                    background: "rgb(58,57,57)",
                  },
                  color: "white",
                },
              },
            ],
          },
          MuiTab: {
            styleOverrides: {
              root: {
                "&:hover": {
                  background: alpha(contrast, 0.5),
                },
                color: color,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <LogInPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        {/*stranice koje imaju light/dark*/}
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Route exact path="/dashboard">
              <Dashboard theme={theme} colorMode={colorMode} />
            </Route>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
