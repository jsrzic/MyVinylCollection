import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

import Homepage from "./pages/Homepage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

import ToggleTheme from "./components/ToggleTheme";
import { ColorModeContext } from "./util/utils";

function App() {
  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "rgb(213,212,212)",
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
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <ToggleTheme colorMode={colorMode} theme={theme} />
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
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
