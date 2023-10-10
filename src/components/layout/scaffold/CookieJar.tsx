import {
  AppBar,
  AppBarProps,
  Box,
  Toolbar,
  ToolbarProps,
  styled,
} from "@mui/material";
import Brand from "./Brand";
import Options from "./Options";

export default function CookieJar() {
  return (
    <StyledAppBar>
      <StyledToolBar>
        <StyledBox>
          <Brand />
        </StyledBox>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Options />
        </div>
      </StyledToolBar>
    </StyledAppBar>
  );
}

const StyledAppBar = styled((props: AppBarProps) => (
  <AppBar position="fixed" {...props} />
))(({ theme }) => ({
  top: 0,
  height: 45,
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderWidth: "thin",
  borderBottomStyle: "solid",
  borderColor: theme.palette.divider,
}));
const StyledToolBar = styled((props: ToolbarProps) => (
  <Toolbar variant="dense" disableGutters {...props} />
))(({ theme }) => ({
  height: "100%",
  minHeight: 0,
  padding: theme.spacing(0, 1),
  justifyContent: "space-between",
}));
const StyledBox = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: "max-content",
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
}));
