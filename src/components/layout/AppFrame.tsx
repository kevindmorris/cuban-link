import React from "react";
import { Outlet } from "react-router-dom";
import CookieJar from "./scaffold/CookieJar";

export default function AppFrame() {
  return (
    <React.Fragment>
      <CookieJar />
      <Outlet />
    </React.Fragment>
  );
}
