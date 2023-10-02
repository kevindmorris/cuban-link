import { IconButton, Link, Typography, TypographyProps } from "@mui/material";
import React from "react";
import { copyContent, formatHash } from "../../common/utils";
import { ContentCopy } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function TypographyHash({ children }: { children: string }) {
  return (
    <React.Fragment>
      <Link
        component={NavLink}
        to={`/transaction/${children}`}
        color="warning.main"
        underline="hover"
      >
        {formatHash(children)}
      </Link>

      <IconButton
        size="small"
        onClick={() => {
          copyContent(children);
        }}
        sx={{ ml: 0.5 }}
      >
        <ContentCopy
          color="inherit"
          sx={(theme) => ({ ...theme.typography.body2 })}
        />
      </IconButton>
    </React.Fragment>
  );
}
