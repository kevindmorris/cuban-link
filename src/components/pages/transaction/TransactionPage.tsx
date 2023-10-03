import React from "react";
import {
  Container,
  Paper,
  PaperProps,
  Typography,
  TypographyProps,
  styled,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import Chart from "react-google-charts";
import _ from "lodash";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/LoadingSpinner";
import { getTransaction } from "../../../state/slices/transactionSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import ElementAvatar from "../../shared/ElementAvatar";
import Party from "../../shared/Party";
import { formatAmount, formatDate, formatValue } from "../../../common/utils";
import FormattedLink from "../../shared/FormattedLink";

export default function TransactionPage() {
  const { hash } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.transaction.status);
  const transaction = useAppSelector((state) => state.transaction.transaction);

  React.useEffect(() => {
    if (hash) dispatch(getTransaction({ hash: hash }));
  }, [hash]);

  if (status === "loading" || !transaction) return <LoadingSpinner />;

  return (
    <Container>
      <HeroPaper>
        <ElementAvatar type="transaction" size="medium" />
        <HeroTitle>Transaction</HeroTitle>
      </HeroPaper>

      <DetailsPaper>
        {[
          {
            label: "Hash",
            value: (
              <FormattedLink variant="transaction">
                {transaction.hash}
              </FormattedLink>
            ),
          },
          {
            label: "Time",
            value: formatDate(transaction.time),
          },
          {
            label: "Block ID",
            value: formatValue(transaction.block_index),
          },
          {
            label: "Weight",
            value: formatValue(transaction.weight),
          },
          {
            label: "Size",
            value: formatValue(transaction.size),
          },
          {
            label: "Inputs",
            value: formatValue(transaction.inputs.length),
          },
          {
            label: "Input Value",
            value:
              formatAmount(
                _.sumBy(transaction.inputs, (e) => e.prev_out.value) / 100000000
              ) + " BTC",
          },
          {
            label: "Fee",
            value: formatValue(transaction.fee) + " Sats",
          },
          {
            label: "Outputs",
            value: formatValue(transaction.out.length),
          },
          {
            label: "Output Value",
            value:
              formatAmount(
                _.sumBy(transaction.out, (e) => e.value) / 100000000
              ) + " BTC",
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

      <ContentPaper>
        <div style={{ flex: 1 }}>
          <Typography fontWeight="bold">From</Typography>
          {transaction.inputs.map((e, i) => (
            <Party key={i} addr={e.prev_out.addr} amount={e.prev_out.value} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <Typography fontWeight="bold">To</Typography>
          {transaction.out.map((e, i) => (
            <Party key={i} addr={e.addr} amount={e.value} />
          ))}
        </div>
      </ContentPaper>

      <ChartPaper>
        <SankeyChart />
      </ChartPaper>
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

const ChartPaper = styled((props: PaperProps) => (
  <Paper variant="outlined" {...props} />
))(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
function SankeyChart() {
  const transaction = useAppSelector((state) => state.transaction.transaction);

  const inputs = React.useMemo(
    () =>
      !transaction
        ? []
        : transaction?.inputs.map((e) => [
            e.prev_out.addr,
            transaction.hash,
            e.prev_out.value,
          ]),
    [transaction]
  );
  const outputs = React.useMemo(
    () =>
      !transaction
        ? []
        : transaction?.out.map((e) => [transaction.hash, e.addr, e.value]),
    [transaction]
  );
  const data = [["From", "To", "Value"], ...inputs, ...outputs];

  const options = {
    sankey: {
      node: {},
      link: {
        colorMode: "gradient",
      },
    },
  };

  return (
    <Chart
      chartType="Sankey"
      width="60vw"
      height="400px"
      data={data}
      options={options}
    />
  );
}
