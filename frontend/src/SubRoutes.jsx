import React from "react";
import { Route } from "react-router-dom";
import DashboardWrap from "./pages/DashboardWrap";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function SubRoutes() {
  return (
    <>
      <Route path="/dashboard/homepage">
        <DashboardWrap>
          <HomePage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/profile">
        <DashboardWrap>
          <ProfilePage />
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/collection">
        <DashboardWrap>
          <h1>collection</h1>
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/ads">
        <DashboardWrap>
          <h1>profile</h1>
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/settings">
        <DashboardWrap>
          <h1>settings</h1>
        </DashboardWrap>
      </Route>
      <Route path="/dashboard/friends">
        <DashboardWrap>
          <h1>friends</h1>
        </DashboardWrap>
      </Route>
    </>
  );
}

export default SubRoutes;
