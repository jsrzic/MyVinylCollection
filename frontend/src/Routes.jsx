import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";

import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import {themeLanding, themeLight} from "./styles/theme";
import { ThemeContext } from "./util/utils";
import SubRoutes from "./SubRoutes";

function Routes() {
  const [theme, setTheme] = React.useState(themeLight);

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={themeLanding}>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
        </ThemeProvider>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeProvider theme={theme}>
            <SubRoutes />
          </ThemeProvider>
        </ThemeContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
