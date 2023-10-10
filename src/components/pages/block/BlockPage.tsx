import {
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getBlock } from "../../../state/slices/blockSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { orange, purple } from "@mui/material/colors";
import {
  formatAmount,
  formatDate,
  formatHash,
  formatValue,
} from "../../../common/utils";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { TransactionObject } from "../../../common/types";
import ReactPaginate from "react-paginate";
import _ from "lodash";

export default function BlockPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.block.status);

  React.useEffect(() => {
    if (id) dispatch(getBlock(id));
  }, [id]);

  if (status === "loading") return <LoadingSpinner />;

  return (
    <Container sx={{ py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Square />
        <BlockNavigation />
      </div>
      <Hero />
      <Details />
      <Summary />
      <Transactions />
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
        backgroundColor: orange[400],
      }}
    />
  );
};
const BlockNavigation = () => {
  const navigate = useNavigate();

  const block = useAppSelector((state) => state.block.base);

  const prevBlock =
    block?.prev_block !==
    "0000000000000000000000000000000000000000000000000000000000000000"
      ? block?.prev_block
      : null;
  const nextBlock =
    block?.next_block && block.next_block.length > 0
      ? block?.next_block[0]
      : null;

  return (
    <div style={{ marginTop: "auto", marginLeft: "auto" }}>
      {prevBlock ? (
        <IconButton
          onClick={() => navigate(`/block/${prevBlock}`)}
          sx={{ backgroundColor: "action.hover" }}
        >
          <NavigateBefore />
        </IconButton>
      ) : null}
      {nextBlock ? (
        <IconButton
          onClick={() => navigate(`/block/${nextBlock}`)}
          sx={{ ml: 0.5, backgroundColor: "action.hover" }}
        >
          <NavigateNext />
        </IconButton>
      ) : null}
    </div>
  );
};

const Hero = () => {
  const block = useAppSelector((state) => state.block.base);

  return (
    <Typography variant="h5">
      Bitcoin Block:{" "}
      <span style={{ fontWeight: "bold" }}>#{block?.height}</span>
    </Typography>
  );
};

const Details = () => {
  const block = useAppSelector((state) => state.block.base);

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
          { label: "Date", value: formatDate(block?.time) },
          { label: "Size", value: formatValue(block?.size) },
          { label: "Height", value: formatValue(block?.height) },
          { label: "Hash", value: block?.hash },
          { label: "Nonce", value: formatValue(block?.nonce) },
          { label: "Bits", value: formatValue(block?.bits) },
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

const Summary = () => {
  const block = useAppSelector((state) => state.block.base);

  const inputs = _.sumBy(block?.tx, function (e) {
    return e.inputs.length;
  });
  const inputValue = _.sumBy(block?.tx, function (e) {
    return _.sumBy(e.inputs, function (f) {
      return f.prev_out.value;
    });
  });
  const outputs = _.sumBy(block?.tx, function (e) {
    return e.out.length;
  });
  const outputValue = _.sumBy(block?.tx, function (e) {
    return _.sumBy(e.inputs, function (f) {
      return f.prev_out.value;
    });
  });
  const minted = outputValue - inputValue;

  const fees = _.sumBy(block?.tx, function (e) {
    return e.fee;
  });

  return (
    <React.Fragment>
      <Typography fontWeight="bold">Summary</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto",
          gridTemplateColumns: "auto 1fr",
          columnGap: 2,
        }}
      >
        {[
          { label: "Transactions", value: formatValue(block?.n_tx) },
          {
            label: "Inputs",
            value: formatValue(inputs),
          },
          {
            label: "Input Value",
            value: formatAmount(inputValue) + " BTC",
          },
          {
            label: "Outputs",
            value: formatValue(outputs),
          },
          {
            label: "Output Value",
            value: formatAmount(outputValue) + " BTC",
          },
          {
            label: "Minted",
            value: formatAmount(minted) + " BTC",
          },
          {
            label: "Fees",
            value: formatAmount(fees) + " BTC",
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

function Transactions({ itemsPerPage = 10 }: { itemsPerPage?: number }) {
  const block = useAppSelector((state) => state.block.base);

  const [itemOffset, setItemOffset] = React.useState(0);

  if (!block) return null;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = block?.tx.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(block?.tx.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % block?.tx.length;
    setItemOffset(newOffset);
  };

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",

        "& .pagination": {
          width: "max-content",
          maxWidth: "100vw",
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          alignSelf: "center",
          listStyle: "none",
          cursor: "pointer",
        },
        "& .pagination a": {
          padding: theme.spacing(1, 1.5),
          borderRadius: 0.5,
          color: theme.palette.text.primary,
          ...theme.typography.body2,
        },
        "& .pagination__link": {
          fontWeight: "bold",
        },
        "& .pagination__link--break a": {
          padding: theme.spacing(1, 0),
        },
        "& .pagination__link--nav a": {
          padding: theme.spacing(1),
          display: "flex",
          alignItems: "center",
        },
        "& .pagination__link--active a": {
          color: theme.palette.text.primary,
          background: theme.palette.action.hover,
        },
        "& .pagination__link--disabled a": {
          color: theme.palette.text.disabled,
        },
      })}
    >
      <Typography fontWeight="bold">Transactions</Typography>
      <TransactionsList current={currentItems} />
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<NavigateBefore />}
        nextLabel={<NavigateNext />}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        previousClassName={"pagination__link--nav"}
        nextClassName={"pagination__link--nav"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        breakClassName={"pagination__link--break"}
      />
    </Box>
  );
}

function TransactionsList({ current }: { current: TransactionObject[] }) {
  return (
    <List>
      <Divider />
      {current.map((e) => (
        <Transaction key={e.hash} tx={e} />
      ))}
    </List>
  );
}

function Transaction({ tx }: { tx: TransactionObject }) {
  const navigate = useNavigate();

  return (
    <MenuItem
      divider
      onClick={() => navigate(`/tx/${tx.hash}`)}
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "stretch",
        },
      })}
    >
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 25,
            height: 25,
            borderRadius: 1,
            backgroundColor: purple[400],
          }}
        />
        <ListItemText
          primary={formatHash(tx.hash)}
          secondary={formatDate(tx.time)}
          primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
          secondaryTypographyProps={{
            variant: "body1",
            color: "text.secondary",
          }}
          sx={{ flex: 1 }}
        />
      </Box>
      <ListItemText
        primary={tx.inputs.length + " Inputs"}
        secondary={tx.out.length + " Outputs"}
        primaryTypographyProps={{ variant: "body1", color: "text.secondary" }}
        secondaryTypographyProps={{ variant: "body1", color: "text.secondary" }}
        sx={{ flex: 1 }}
      />
      <ListItemText
        primary={
          formatAmount(
            _.sumBy(tx.out, function (o) {
              return o.value;
            })
          ) + " BTC"
        }
        secondary={
          <React.Fragment>
            <Typography component="span" color="error.main">
              Fee
            </Typography>{" "}
            {formatValue(tx.fee)} Sats
          </React.Fragment>
        }
        primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
        secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
        sx={{ flex: 1, textAlign: "right" }}
      />
    </MenuItem>
  );
}
