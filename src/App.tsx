import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { useAppSelector } from "./state/hooks";
import AppFrame from "./components/layout/AppFrame";
import { darkTheme, lightTheme } from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import router from "./components/layout/router/router";

export default function App() {
  const darkMode = useAppSelector((state) => state.global.user.darkMode);

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Fragment>
  );
}
