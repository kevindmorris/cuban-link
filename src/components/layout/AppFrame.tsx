import React from "react";
import { Outlet } from "react-router-dom";
import CookieJar from "./scaffold/CookieJar";
import { Paper } from "@mui/material";

export default function AppFrame() {
  return (
    <React.Fragment>
      <CookieJar />
      <Paper
        square
        elevation={0}
        sx={{
          minHeight: "calc(100vh - 50px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Paper>
    </React.Fragment>
  );
}
