import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getBlock } from "../../../state/slices/blockSlice";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { orange } from "@mui/material/colors";
import { formatDate, formatValue } from "../../../common/utils";

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
      <Square />
      <Hero />
      <Details />
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
        { label: "Transactions", value: formatValue(block?.n_tx) },
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
  );
};
