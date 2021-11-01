import React from "react";

import { Paper } from "@mui/material";

import TopNavBar from "../components/TopNavBar";
import SideNavBar from "../components/SideNavBar";

function Dashboard({ colorMode, theme }) {
  return (
    <Paper
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <TopNavBar colorMode={colorMode} theme={theme} />
      <div style={{ display: "flex", marginTop: "4rem", height: "100%" }}>
        <SideNavBar />
      </div>
    </Paper>
  );
}

export default Dashboard;
