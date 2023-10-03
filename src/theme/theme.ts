import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: { mode: "light" },
  typography: { fontFamily: "Inter, sans-serif" },
});
const darkTheme = createTheme({
  palette: { mode: "dark" },
  typography: { fontFamily: "Inter, sans-serif" },
});

export { lightTheme, darkTheme };
