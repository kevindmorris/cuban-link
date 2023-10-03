import React from "react";
import {
  Box,
  Collapse,
  Container,
  IconButton,
  Paper,
  PaperProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";

import LoadingSpinner from "../../shared/LoadingSpinner";
import { getAddress } from "../../../state/slices/addressSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import ElementAvatar from "../../shared/ElementAvatar";
import Party from "../../shared/Party";
import { formatAmount, formatDate, formatValue } from "../../../common/utils";
import FormattedLink from "../../shared/FormattedLink";
import { TransactionObject } from "../../../common/types";
import { getBlock } from "../../../state/slices/blockSlice";

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
      <HeroPaper>
        <ElementAvatar type="block" size="medium" />
        <HeroTitle>Block</HeroTitle>
      </HeroPaper>

      <DetailsPaper>
        {[
          {
            label: "Hash",
            value: <FormattedLink variant="block">{block.hash}</FormattedLink>,
          },
          {
            label: "Height",
            value: formatValue(block.height),
          },
          {
            label: "Size",
            value: formatValue(block.size),
          },
          {
            label: "Transactions",
            value: formatValue(block.n_tx),
          },
          {
            label: "Mined on",
            value: formatDate(block.time),
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
      </DetailsPaper>

      <Content />
    </Container>
  );
}

const HeroPaper = styled((props: PaperProps) => (
  <Paper variant="outlined" {...props} />
))(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  display: "flex",
  gap: theme.spacing(2),
}));
const HeroTitle = styled((props: TypographyProps) => (
  <Typography variant="h4" fontWeight="bold" noWrap {...props} />
))(({ theme }) => ({}));

const DetailsPaper = styled((props: PaperProps) => (
  <Paper variant="outlined" {...props} />
))(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  display: "grid",
  gridTemplateRows: "auto",
  gridTemplateColumns: "auto 1fr",
  columnGap: theme.spacing(2),
}));

const ContentPaper = styled((props: PaperProps) => (
  <Paper variant="outlined" {...props} />
))(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  display: "flex",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
function Content() {
  const transactions = useAppSelector((state) => state.block.block?.tx);

  const data = React.useMemo(
    () =>
      transactions ? [...transactions].sort((a, b) => b.time - a.time) : [],
    [transactions]
  );

  return (
    <Virtuoso
      useWindowScroll
      data={data}
      itemContent={(i, tx) => <Transaction tx={tx} />}
    />
  );
}

function Transaction({
  tx,
  address,
}: {
  tx: TransactionObject;
  address?: string;
}) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Box sx={{ py: 0.5 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ElementAvatar type="transaction" size="xs" />
            <div style={{ flex: 1, overflow: "hidden" }}>
              <Typography noWrap>
                <FormattedLink variant="transaction">{tx.hash}</FormattedLink>
              </Typography>
              <Typography noWrap>{formatDate(tx.time)}</Typography>
            </div>
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <Typography>{formatValue(tx.inputs.length)} Inputs</Typography>
            <Typography>{formatValue(tx.out.length)} Outputs</Typography>
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "right",
            }}
          >
            <Typography>
              {formatAmount(_.sumBy(tx.out, (e) => e.value) / 100000000)} BTC
            </Typography>
            <Typography>
              <SpanError>Fee</SpanError> {formatValue(tx.fee)} Sats
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => setOpen(!open)}>
              <ExpandMore
                sx={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
              />
            </IconButton>
          </div>
        </Box>

        <Collapse in={open}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography fontWeight="bold">From</Typography>
              {tx.inputs.map((e, i) => (
                <Party
                  key={i}
                  addr={e.prev_out.addr}
                  amount={e.prev_out.value}
                />
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <Typography fontWeight="bold">To</Typography>
              {tx.out.map((e, i) => (
                <Party key={i} addr={e.addr} amount={e.value} />
              ))}
            </div>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}

const SpanError = styled("span")(({ theme }) => ({
  color: theme.palette.error.main,
}));
