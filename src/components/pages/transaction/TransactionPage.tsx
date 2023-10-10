import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getTransaction } from "../../../state/slices/transactionSlice";
import LoadingSpinner from "../../shared/LoadingSpinner";
import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { green, orange, purple } from "@mui/material/colors";
import {
  formatAmount,
  formatDate,
  formatHash,
  formatValue,
} from "../../../common/utils";
import _ from "lodash";

export default function TransactionPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.transaction.status);

  React.useEffect(() => {
    if (id) dispatch(getTransaction(id));
  }, [id]);

  if (status === "loading") return <LoadingSpinner />;

  return (
    <Container sx={{ py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <Square />
      <Hero />
      <Details />
      <From />
      <To />
    </Container>
  );
}

const Square = () => {
  return (
    <Box
      sx={{
        width: 75,
        height: 75,
        borderRadius: 1,
        backgroundColor: purple[400],
      }}
    />
  );
};

const Hero = () => {
  const tx = useAppSelector((state) => state.transaction.base);

  return (
    <Typography variant="h5">
      Transaction:{" "}
      <span style={{ fontWeight: "bold" }}>{formatHash(tx?.hash)}</span>
    </Typography>
  );
};

const Details = () => {
  const tx = useAppSelector((state) => state.transaction.base);

  return (
    <React.Fragment>
      <Typography fontWeight="bold">Details</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto",
          gridTemplateColumns: "auto 1fr",
          columnGap: 2,
        }}
      >
        {[
          { label: "Date", value: formatDate(tx?.time) },
          { label: "Hash", value: tx?.hash },
          {
            label: "Block",
            value: (
              <Link
                component={NavLink}
                to={`/block/${tx?.block_index}`}
                fontStyle="normal"
                color={orange[500]}
              >
                #{tx?.block_index}
              </Link>
            ),
          },
          { label: "Size", value: formatValue(tx?.size) + " Bytes" },
          { label: "Weight", value: formatValue(tx?.weight) },
          { label: "Inputs", value: tx?.inputs.length },
          {
            label: "Input Value",
            value:
              formatAmount(
                _.sumBy(tx?.inputs, function (o) {
                  return o.prev_out.value;
                })
              ) + " BTC",
          },
          { label: "Outputs", value: tx?.out.length },
          {
            label: "Output Value",
            value:
              formatAmount(
                _.sumBy(tx?.out, function (o) {
                  return o.value;
                })
              ) + " BTC",
          },
        ].map((e, i) => (
          <React.Fragment key={i}>
            <Typography gridRow={i + 1} gridColumn={1} color="text.secondary">
              {e.label}
            </Typography>
            <Typography
              gridRow={i + 1}
              gridColumn={2}
              sx={{ wordBreak: "break-all" }}
            >
              {e.value}
            </Typography>
          </React.Fragment>
        ))}
      </Box>
    </React.Fragment>
  );
};

const From = () => {
  const tx = useAppSelector((state) => state.transaction.base);

  return (
    <React.Fragment>
      <Typography fontWeight="bold">From</Typography>
      <List dense disablePadding>
        {tx?.inputs.map((e, i) => (
          <ListItem key={i} dense disablePadding disableGutters>
            <Box
              sx={{
                width: 25,
                height: 25,
                borderRadius: 1,
                backgroundColor: green[400],
                mr: 1,
              }}
            />
            <ListItemText
              primary={e.prev_out.addr}
              secondary={formatAmount(e.prev_out.value) + " BTC"}
              primaryTypographyProps={{
                variant: "body1",
                color: "text.primary",
                noWrap: true,
              }}
              secondaryTypographyProps={{
                variant: "body1",
                color: "text.secondary",
              }}
              sx={{ flex: 1 }}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};
const To = () => {
  const tx = useAppSelector((state) => state.transaction.base);

  return (
    <React.Fragment>
      <Typography fontWeight="bold">To</Typography>
      <List dense disablePadding>
        {tx?.out.map((e, i) => (
          <ListItem key={i} dense disablePadding disableGutters>
            <Box
              sx={{
                width: 25,
                height: 25,
                borderRadius: 1,
                backgroundColor: green[400],
                mr: 1,
              }}
            />
            <ListItemText
              primary={e.addr}
              secondary={formatAmount(e.value) + " BTC"}
              primaryTypographyProps={{
                variant: "body1",
                color: "text.primary",
                noWrap: true,
              }}
              secondaryTypographyProps={{
                variant: "body1",
                color: "text.secondary",
              }}
              sx={{ flex: 1 }}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};
