import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { RouterProvider } from "react-router-dom";

import { useAppSelector } from "./state/hooks";
import { darkTheme, lightTheme } from "./theme/theme";
import router from "./components/layout/router/router";

export default function App() {
  const darkMode = useAppSelector((state) => state.user.darkMode);

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Fragment>
  );
}
