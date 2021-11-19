import React from "react";

import { Paper } from "@mui/material";

import TopNavBar from "../components/TopNavBar";
import SideNavBar from "../components/SideNavBar";
import { IsMobile } from "../util/utils";

const subScreenStyle = {
  display: "flex",
  marginTop: "4rem",
  height: "100%",
};
const scrollContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  maxHeight: "90vh",
  overflowY: "scroll",
  justifyContent: "space-between",
  width: "100%",
};

function DashboardWrap({ children }) {
  return (
    <Paper
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "fixed"
      }}
    >
      <TopNavBar />
      <div style={subScreenStyle}>
        <SideNavBar />
        <div style={scrollContainerStyle}>{children}</div>
      </div>
    </Paper>
  );
}

export default DashboardWrap;
