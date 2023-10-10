import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getAddress } from "../../../state/slices/addressSlice";
import LoadingSpinner from "../../shared/LoadingSpinner";
import {
  Box,
  Container,
  Divider,
  Link,
  List,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { green, purple } from "@mui/material/colors";
import {
  formatAmount,
  formatDate,
  formatHash,
  formatValue,
} from "../../../common/utils";
import { TransactionObject } from "../../../common/types";
import _ from "lodash";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import ReactPaginate from "react-paginate";

export default function AddressPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.address.status);

  React.useEffect(() => {
    if (id) dispatch(getAddress(id));
  }, [id]);

  if (status === "loading") return <LoadingSpinner />;

  return (
    <Container sx={{ py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <Square />
      <Hero />
      <Details />
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
        backgroundColor: green[400],
      }}
    />
  );
};

const Hero = () => {
  const address = useAppSelector((state) => state.address.base);

  return (
    <Typography variant="h5">
      Address:{" "}
      <span style={{ fontWeight: "bold" }}>{formatHash(address?.address)}</span>
    </Typography>
  );
};

const Details = () => {
  const address = useAppSelector((state) => state.address.base);

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
          { label: "Address", value: address?.address },

          {
            label: "Total Sent",
            value: formatAmount(address?.total_sent) + " BTC",
          },
          {
            label: "Total Received",
            value: formatAmount(address?.total_received) + " BTC",
          },
          {
            label: "Total Volume",
            value:
              formatAmount(
                address?.total_received && address.total_sent
                  ? address?.total_received + address?.total_sent
                  : undefined
              ) + " BTC",
          },
          {
            label: "Balance",
            value: formatAmount(address?.final_balance) + " BTC",
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
  const address = useAppSelector((state) => state.address.base);

  const [itemOffset, setItemOffset] = React.useState(0);

  if (!address) return null;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = address?.txs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(address?.txs.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % address?.txs.length;
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

  const address = useAppSelector((state) => state.address.base);

  const sent = tx.inputs.find((e) => e.prev_out.addr === address?.address);
  const received = tx.out.find((e) => e.addr === address?.address);

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
          primary={<Link color={purple[400]}>{formatHash(tx.hash)}</Link>}
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
          sent ? "- " + formatAmount(sent?.prev_out.value) + " BTC" : undefined
        }
        secondary={
          received ? formatAmount(received?.value) + " BTC" : undefined
        }
        primaryTypographyProps={{
          variant: "body1",
          color: "error.main",
          fontWeight: "bold",
        }}
        secondaryTypographyProps={{
          variant: "body1",
          color: "success.main",
          fontWeight: "bold",
        }}
        sx={{ flex: 1, textAlign: "right" }}
      />
    </MenuItem>
  );
}
