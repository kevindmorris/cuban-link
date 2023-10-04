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
import { getTransaction } from "../../../state/slices/transactionSlice";
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

export default function TransactionPage() {
  const { hash } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.transaction.status);
  const tx = useAppSelector((state) => state.transaction.transaction);

  React.useEffect(() => {
    if (hash) dispatch(getTransaction({ hash: hash }));
  }, [hash]);

  if (status === "loading" || !tx) return <LoadingSpinner />;

  return (
    <Container>
      <Paper variant="outlined" sx={{ my: 2, p: 2 }}>
        <ElementAvatar variant="transaction" size="sm" />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ wordBreak: "break-all" }}
        >
          Bitcoin Transaction
        </Typography>
        <Typography
          gutterBottom
          color="text.disabled"
          sx={{ wordBreak: "break-all" }}
        >
          Broadcasted on {formatDate(tx.time)}
        </Typography>
        <Typography fontWeight="bold" sx={{ wordBreak: "break-all" }}>
          TXID
        </Typography>
        <FormattedLink
          variant="transaction"
          disabled
          wrapperProps={{ gutterBottom: true }}
        >
          {tx.hash}
        </FormattedLink>

        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "auto 1fr",
            columnGap: 2,
          }}
        >
          <Typography gridRow={1} gridColumn={1} fontWeight="bold">
            Amount
          </Typography>
          <Typography gridRow={1} gridColumn={2}>
            {formatAmount(_.sumBy(tx.out, (e) => e.value))} BTC
          </Typography>
          <Typography gridRow={2} gridColumn={1} fontWeight="bold">
            Fee
          </Typography>
          <Typography gridRow={2} gridColumn={2} gutterBottom>
            {formatValue(tx.fee)} Sats
          </Typography>
          <Typography gridRow={3} gridColumn={1} fontWeight="bold">
            From
          </Typography>
          <Typography gridRow={3} gridColumn={2}>
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
          <Typography gridRow={4} gridColumn={1} fontWeight="bold">
            To
          </Typography>
          <Typography gridRow={4} gridColumn={2}>
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
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ my: 2, p: 2 }}>
        <Typography fontWeight="bold">From</Typography>
        {[...tx.inputs]
          .sort((a, b) => b.prev_out.value - a.prev_out.value)
          .map((e, i) => (
            <Party key={i} party={e.prev_out.addr} amount={e.prev_out.value} />
          ))}
        <Typography fontWeight="bold">To</Typography>
        {[...tx.out]
          .sort((a, b) => b.value - a.value)
          .map((e, i) => (
            <Party key={i} party={e.addr} amount={e.value} />
          ))}
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
            value: <FormattedLink abbreviated>{tx.hash}</FormattedLink>,
          },
          {
            label: "Time",
            value: formatDate(tx.time),
          },
          {
            label: "Block ID",
            value: formatValue(tx.block_index),
          },
          {
            label: "Weight",
            value: formatValue(tx.weight),
          },
          {
            label: "Size",
            value: formatValue(tx.size),
          },
          {
            label: "Inputs",
            value: formatValue(tx.inputs.length),
          },
          {
            label: "Input Value",
            value:
              formatAmount(
                _.sumBy(tx.inputs, (e) => e.prev_out.value) / 100000000
              ) + " BTC",
          },
          {
            label: "Fee",
            value: formatValue(tx.fee) + " Sats",
          },
          {
            label: "Outputs",
            value: formatValue(tx.out.length),
          },
          {
            label: "Output Value",
            value: formatAmount(_.sumBy(tx.out, (e) => e.value)) + " BTC",
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
    </Container>
  );
}

const Party = ({ party, amount }: { party: string; amount: number }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
      <ElementAvatar variant="address" size="xs" />
      <div style={{ flex: 1, overflow: "hidden" }}>
        {party ? (
          <Typography noWrap display="flex">
            <Link
              component={NavLink}
              to={`/address/${party}`}
              color={green[500]}
              noWrap
              underline="hover"
            >
              {party}
            </Link>
            <ContentCopy
              onClick={() => copyContent(party)}
              color="disabled"
              sx={(theme) => ({
                cursor: "pointer",
                ml: 0.5,
                ...theme.typography.body1,
              })}
            />
          </Typography>
        ) : (
          <Typography noWrap display="flex">
            Unknown
          </Typography>
        )}
        <Typography sx={{ wordBreak: "break-all" }}>
          {formatAmount(amount)} BTC
        </Typography>
      </div>
    </Box>
  );
};
