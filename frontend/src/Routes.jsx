import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";

import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { themeLight } from "./styles/theme";
import { ThemeContext } from "./util/utils";

function Routes() {
  const [theme, setTheme] = React.useState(themeLight);

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
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeProvider theme={theme}>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </ThemeProvider>
        </ThemeContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
