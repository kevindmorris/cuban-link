import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: { mode: "light" },
  typography: { fontFamily: "Inter, sans-serif" },
  components: { MuiTypography: { defaultProps: { noWrap: true } } },
});
const darkTheme = createTheme({ palette: { mode: "dark" } });

export { lightTheme, darkTheme };
