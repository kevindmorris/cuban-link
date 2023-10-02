import React from "react";
import { TransactionObject } from "../../common/types";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Link,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import {
  copyContent,
  formatAmount,
  formatDate,
  formatHash,
} from "../../common/utils";
import { ContentCopy, ExpandMore, SwapHoriz } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import _ from "lodash";

export default function TransactionItem({
  transaction,
}: {
  transaction: TransactionObject;
}) {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "grid",
        gridTemplateRows: "1fr auto",
        gridTemplateColumns: "auto 1fr 1fr 1fr auto",
        columnGap: 1,
        mx: 1,
        mb: 1,
        p: 1,
      }}
    >
      <div
        style={{
          gridRow: 1,
          gridColumn: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            color: "divider",
            backgroundColor: "transparent",
            borderColor: "divider",
            borderWidth: "thin",
            borderStyle: "solid",
          }}
        >
          <SwapHoriz />
        </Avatar>
      </div>

      <div
        style={{
          gridRow: 1,
          gridColumn: 2,
        }}
      >
        <SpanDisabled>TXID: </SpanDisabled>
        <Element text={transaction.hash} abbreviate type="transaction" />
        <Typography>{formatDate(transaction.time)}</Typography>
      </div>

      <div
        style={{
          gridRow: 1,
          gridColumn: 3,
        }}
      >
        <Typography>
          From <SpanDisabled>{transaction.inputs.length} Inputs</SpanDisabled>
        </Typography>
        <Typography>
          To <SpanDisabled>{transaction.out.length} Outputs</SpanDisabled>
        </Typography>
      </div>

      <div
        style={{
          gridRow: 1,
          gridColumn: 4,
          textAlign: "right",
        }}
      >
        <Typography>
          {formatAmount(_.sumBy(transaction.out, (e) => e.value) / 100000000)}{" "}
          BTC
        </Typography>
        <Typography>
          <SpanError>Fee</SpanError> {transaction.fee} Sats
        </Typography>
      </div>

      <Box
        sx={{
          ml: 1,
          gridRow: 1,
          gridColumn: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => setOpen(!open)}>
          <ExpandMore
            sx={{
              transform: open ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.25s ease",
            }}
          />
        </IconButton>
      </Box>

      <Collapse
        in={!open}
        sx={{
          gridRow: 2,
          gridColumn: "1/span 5",
        }}
      >
        <Box
          sx={{
            pt: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography fontWeight="bold">From</Typography>
            {transaction.inputs.map((input, i) => (
              <Operator
                key={i}
                index={i}
                address={input.prev_out.addr}
                amount={input.prev_out.value}
              />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <Typography fontWeight="bold">To</Typography>
            {transaction.out.map((output, i) => (
              <Operator
                key={i}
                index={i}
                address={output.addr}
                amount={output.value}
              />
            ))}
          </div>
        </Box>
      </Collapse>
    </Paper>
  );
}

function Operator({
  index,
  address,
  amount,
}: {
  index: number;
  address: string;
  amount: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography fontWeight="bold" m={2}>
        {index + 1}
      </Typography>
      <div>
        <Element text={address} type="address" abbreviate />
        <Typography>{formatAmount(amount / 100000000)} BTC</Typography>
      </div>
    </div>
  );
}

function Element({
  text,
  abbreviate,
  type,
}: {
  text: string;
  abbreviate?: boolean;
  type: string;
}) {
  if (!text) return <Typography>Unknown</Typography>;

  const displayText = abbreviate ? formatHash(text) : text;

  return (
    <Typography noWrap display="inline-flex" alignItems="center">
      <Link
        component={NavLink}
        to={`/${type}/${text}`}
        color="warning.main"
        noWrap
      >
        {displayText}
      </Link>
      <ContentCopy
        color="disabled"
        onClick={(e) => {
          e.stopPropagation();
          copyContent(text);
        }}
        sx={(theme) => ({
          ml: 0.5,
          cursor: "pointer",
          ...theme.typography.body2,
        })}
      />
    </Typography>
  );
}

const SpanDisabled = styled("span")(({ theme }) => ({
  color: theme.palette.text.disabled,
}));
const SpanError = styled("span")(({ theme }) => ({
  color: theme.palette.error.main,
}));
