import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { IconButton } from "@mui/material";
import { toggleTheme } from "../../../state/slices/userSlice";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function Options() {
  const dispatch = useAppDispatch();

  const darkMode = useAppSelector((state) => state.user.darkMode);

  return (
    <IconButton size="small" onClick={() => dispatch(toggleTheme())}>
      {darkMode ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
