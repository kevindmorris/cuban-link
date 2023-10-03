import { Box, useTheme } from "@mui/material";
import { blue, green, orange, purple, red, yellow } from "@mui/material/colors";
import React from "react";

export default function ElementAvatar({
  type,
  size = "medium",
}: {
  type: "block" | "address" | "transaction";
  size?: "xs" | "small" | "medium" | "large";
}) {
  const theme = useTheme();

  const colors = React.useMemo(() => {
    switch (type) {
      default:
      case "block":
        return { start: orange[500], end: red[500] };
      case "address":
        return { start: green[500], end: yellow[500] };
      case "transaction":
        return { start: purple[500], end: blue[500] };
    }
  }, [type]);

  const dimension = React.useMemo(() => {
    switch (size) {
      default:
      case "xs":
        return 25;
      case "small":
        return 50;
      case "medium":
        return 100;
      case "large":
        return 150;
    }
  }, [size]);

  return (
    <Box
      sx={{
        width: dimension,
        height: dimension,
        aspectRatio: "1 / 1",
        background: `linear-gradient(to left top, ${colors.start}, ${colors.end})`,
        borderRadius: theme.spacing(0.5),
        [theme.breakpoints.down("sm")]: {
          width: Math.pow(dimension, 0.9),
          height: Math.pow(dimension, 0.9),
        },
      }}
    />
  );
}
