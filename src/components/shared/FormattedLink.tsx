import React from "react";
import { Link, Tooltip } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { ContentCopy } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

import { copyContent, formatHash } from "../../common/utils";

const FormattedLink = ({
  variant,
  children,
}: {
  variant: "block" | "address" | "transaction";
  children: string;
}) => {
  const color = React.useMemo(() => {
    switch (variant) {
      default:
      case "block":
        return red[500];
      case "address":
        return green[500];
      case "transaction":
        return blue[500];
    }
  }, [variant]);

  return (
    <React.Fragment>
      <Tooltip title={children}>
        <Link
          component={NavLink}
          to={`/${variant}/${children}`}
          color={color}
          noWrap
        >
          {formatHash(children)}
        </Link>
      </Tooltip>
      <ContentCopy
        fontSize="inherit"
        color="disabled"
        onClick={() => copyContent(children)}
        sx={{ ml: 0.5, cursor: "pointer" }}
      />
    </React.Fragment>
  );
};

export default FormattedLink;
