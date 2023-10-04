import { Box, useTheme } from "@mui/material";
import { blue, green, orange, purple, red, yellow } from "@mui/material/colors";
import React from "react";

export default function ElementAvatar({
  variant,
  size = "md",
}: {
  variant: "block" | "address" | "transaction";
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const theme = useTheme();

  const colors = React.useMemo(() => {
    switch (variant) {
      default:
      case "block":
        return { start: orange[500], end: red[500] };
      case "address":
        return { start: green[500], end: yellow[500] };
      case "transaction":
        return { start: purple[500], end: blue[500] };
    }
  }, [variant]);

  const dimension = React.useMemo(() => {
    switch (size) {
      default:
      case "xs":
        return 30;
      case "sm":
        return 60;
      case "md":
        return 90;
      case "lg":
        return 120;
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
      }}
    />
  );
}
