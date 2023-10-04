import React from "react";
import {
  Box,
  Container,
  Link,
  Paper,
  PaperProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import Chart from "react-google-charts";
import _ from "lodash";
import { NavLink, useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/LoadingSpinner";
import { getBlock } from "../../../state/slices/blockSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import ElementAvatar from "../../shared/ElementAvatar";
import {
  copyContent,
  formatAmount,
  formatDate,
  formatValue,
} from "../../../common/utils";
import FormattedLink from "../../shared/FormattedLink";
import { ContentCopy } from "@mui/icons-material";

export default function BlockPage() {
  const { hash } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.block.status);
  const block = useAppSelector((state) => state.block.block);

  React.useEffect(() => {
    if (hash) dispatch(getBlock({ hash: hash }));
  }, [hash]);

  if (status === "loading" || !block) return <LoadingSpinner />;

  return (
    <Container>
      <Paper variant="outlined" sx={{ my: 2, p: 2 }}>
        <ElementAvatar variant="block" size="sm" />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ wordBreak: "break-all" }}
        >
          Bitcoin Block {formatValue(block.block_index)}
        </Typography>
        <Typography
          gutterBottom
          color="text.disabled"
          sx={{ wordBreak: "break-all" }}
        >
          Mined on {formatDate(block.time)}
        </Typography>
        <Typography fontWeight="bold" sx={{ wordBreak: "break-all" }}>
          Block Hash
        </Typography>
        <FormattedLink variant="block" disabled>
          {block.hash}
        </FormattedLink>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          my: 2,
          p: 2,
          display: "grid",
          gridTemplateRows: "auto",
          gridTemplateColumns: "auto 1fr",
          columnGap: 2,
        }}
      >
        {[
          {
            label: "Hash",
            value: <FormattedLink abbreviated>{block.hash}</FormattedLink>,
          },
          {
            label: "Height",
            value: formatValue(block.height),
          },
          {
            label: "Mined on",
            value: formatDate(block.time),
          },
          {
            label: "Transactions",
            value: formatValue(block.n_tx),
          },
        ].map((e, i) => (
          <React.Fragment key={e.label}>
            <Typography gridRow={i + 1} gridColumn={1} fontWeight="bold" noWrap>
              {e.label}
            </Typography>
            <Typography gridRow={i + 1} gridColumn={2} noWrap>
              {e.value}
            </Typography>
          </React.Fragment>
        ))}
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          my: 2,
          p: 2,
        }}
      >
        <Typography fontWeight="bold" sx={{ wordBreak: "break-all" }}>
          Transactions
        </Typography>
        {block.tx.slice(0, 10).map((tx, i) => (
          <Box key={i} sx={{ display: "flex", my: 1, p: 1, gap: 2 }}>
            <ElementAvatar variant="transaction" size="xs" />
            <div style={{ flex: 1 }}>
              <FormattedLink abbreviated variant="transaction">
                {tx.hash}
              </FormattedLink>
              <Typography color="text.disabled" gutterBottom>
                {formatDate(tx.time)}
              </Typography>

              <Typography noWrap component="div">
                <span>From </span>

                {tx.inputs.length > 1 ? (
                  tx.inputs.length + " Inputs"
                ) : tx.inputs[0].prev_out.addr ? (
                  <FormattedLink variant="address" abbreviated>
                    {tx.inputs[0].prev_out.addr}
                  </FormattedLink>
                ) : (
                  "Unknown"
                )}
              </Typography>
              <Typography noWrap gutterBottom component="div">
                <span>To </span>

                {tx.out.length > 1 ? (
                  tx.out.length + " Outputs"
                ) : tx.out[0].addr ? (
                  <FormattedLink variant="address" abbreviated>
                    {tx.out[0].addr}
                  </FormattedLink>
                ) : (
                  "Unknown"
                )}
              </Typography>

              <Typography>
                {formatAmount(_.sumBy(tx.out, (e) => e.value))} BTC
              </Typography>
              <Typography gutterBottom>
                <Typography component="span" color={red[500]}>
                  Fee
                </Typography>{" "}
                {formatValue(tx.fee)} Sats
              </Typography>
            </div>
          </Box>
        ))}
      </Paper>
    </Container>
  );
}
