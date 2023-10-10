import React from "react";
import { Outlet } from "react-router-dom";
import CookieJar from "./scaffold/CookieJar";
import { Paper, PaperProps, styled } from "@mui/material";

export default function AppFrame() {
  return (
    <React.Fragment>
      <CookieJar />
      <PaperBackground>
        <Outlet />
      </PaperBackground>
    </React.Fragment>
  );
}

const PaperBackground = styled((props: PaperProps) => (
  <Paper square elevation={0} {...props} />
))(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
}));
