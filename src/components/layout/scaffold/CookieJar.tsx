import { DarkMode, LightMode } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  IconButton,
  Link,
  Toolbar,
  ToolbarProps,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { toggleTheme } from "../../../state/slices/userSlice";
import { NavLink } from "react-router-dom";
import Brand from "./Brand";
import Search from "./Search";

export default function CookieJar() {
  return (
    <StyledAppBar>
      <StyledToolBar>
        <div
          style={{
            minWidth: "max-content",
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Brand />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Options />
        </div>
      </StyledToolBar>
    </StyledAppBar>
  );
}

function Options() {
  const dispatch = useAppDispatch();

  const darkMode = useAppSelector((state) => state.user.darkMode);

  return (
    <IconButton onClick={() => dispatch(toggleTheme())}>
      {darkMode ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}

const StyledAppBar = styled((props: AppBarProps) => (
  <AppBar position="sticky" {...props} />
))(({ theme }) => ({
  height: 50,
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderWidth: "thin",
  borderBottomStyle: "solid",
  borderColor: theme.palette.divider,
}));
const StyledToolBar = styled((props: ToolbarProps) => (
  <Toolbar variant="dense" {...props} />
))(({ theme }) => ({ justifyContent: "space-between" }));
