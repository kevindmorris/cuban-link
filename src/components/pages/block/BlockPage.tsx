import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getBlock } from "../../../state/slices/blockSlice";
import LoadingSpinner from "../../shared/LoadingSpinner";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Paper,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { TransactionObject } from "../../../common/types";
import { ExpandMore, SwapHoriz } from "@mui/icons-material";
import { Virtuoso } from "react-virtuoso";
import { formatAmount, formatDate, formatHash } from "../../../common/utils";
import TypographyHash from "../../shared/TypographyHash";
import _ from "lodash";
import TransactionItem from "../../shared/TransactionItem";

export default function BlockPage() {
  const { hash } = useParams();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const status = useAppSelector((state) => state.block.status);
  const block = useAppSelector((state) => state.block.block);

  const transactions = React.useMemo(() => {
    if (!block) return [];
    return [...block?.tx];
    // return [...block?.tx].sort((a, b) => a.time - b.time);
  }, [block]);

  React.useEffect(() => {
    if (hash) dispatch(getBlock({ hash: hash }));
  }, [hash]);

  if (status === "loading" || !block) return <LoadingSpinner />;

  return (
    <React.Fragment>
      <Paper variant="outlined" sx={{ m: 2, p: 2 }}>
        <BitcoinBlock />
        <Typography>Hash: {formatHash(block?.hash)}</Typography>
        <Typography>Transactions: {block?.n_tx}</Typography>
        <Typography>
          Time:{" "}
          {moment(block?.time ? block?.time * 1000 : 0).format(
            "yyyy-MM-DD hh:mm:ss"
          )}
        </Typography>
      </Paper>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Paper
            variant="outlined"
            sx={{ position: "sticky", top: 60, mx: 2, p: 2 }}
          >
            <BitcoinBlock />
            <Typography>Hash: {formatHash(block?.hash)}</Typography>
            <Typography>Transactions: {block?.n_tx}</Typography>
            <Typography>
              Time:{" "}
              {moment(block?.time ? block?.time * 1000 : 0).format(
                "yyyy-MM-DD hh:mm:ss"
              )}
            </Typography>
          </Paper>
        </div>
        <div style={{ flex: 2 }}>
          <Virtuoso
            useWindowScroll
            data={transactions}
            itemContent={(i, transaction) => (
              <TransactionItem transaction={transaction} />
            )}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

const BitcoinBlock = styled("div")(({ theme }) => ({
  maxWidth: 200,
  width: "25vw",
  aspectRatio: "1 / 1",
  color: theme.palette.text.disabled,
  background: `linear-gradient(to left top, ${alpha(
    theme.palette.warning.main,
    0.75
  )}, ${alpha(theme.palette.error.main, 1)})`,
  borderRadius: theme.spacing(0.5),
}));
