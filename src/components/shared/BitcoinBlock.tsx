import { alpha, styled } from "@mui/material";
import React from "react";

const BitcoinBlock = styled("div")(({ theme }) => ({
  maxWidth: 200,
  width: "25vw",
  aspectRatio: "1 / 1",
  color: theme.palette.text.disabled,
  background: `linear-gradient(to left top, ${alpha(
    theme.palette.warning.main,
    0.75
  )}, ${alpha(theme.palette.error.main, 1)})`,
  borderRadius: theme.spacing(0.5),
}));

export default BitcoinBlock;
