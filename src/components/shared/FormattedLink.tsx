import React from "react";
import { Link, Tooltip, Typography, TypographyProps } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { ContentCopy } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

import { copyContent, formatHash } from "../../common/utils";

const FormattedLink = ({
  variant,
  disabled,
  children,
  abbreviated,
  wrapperProps,
}: {
  variant?: "block" | "address" | "transaction";
  disabled?: boolean;
  children: string;
  abbreviated?: boolean;
  wrapperProps?: TypographyProps;
}) => {
  const color = React.useMemo(() => {
    switch (variant) {
      default:
        return "text.primary";
      case "block":
        return red[500];
      case "address":
        return green[500];
      case "transaction":
        return blue[500];
    }
  }, [variant]);

  const text = React.useMemo(
    () => (abbreviated ? formatHash(children) : children),
    [abbreviated, children]
  );

  return (
    <Typography
      component="span"
      display="inline"
      sx={{ wordBreak: "break-all" }}
      {...wrapperProps}
    >
      <Tooltip title={children}>
        <Link
          component={NavLink}
          to={`/${variant}/${children}`}
          color={disabled ? "text.disabled" : color}
          underline="hover"
        >
          {text}
        </Link>
      </Tooltip>
      <ContentCopy
        fontSize="inherit"
        color="disabled"
        onClick={() => copyContent(children)}
        sx={{ ml: 0.5, cursor: "pointer" }}
      />
    </Typography>
  );
};

export default FormattedLink;
