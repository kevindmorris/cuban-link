import { Box, Container, Link, Paper, Stack, Typography } from "@mui/material";
import { Api } from "../../../services/Api";
import React from "react";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <Container
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LandingPageBrand />
        <LandingPageText />
        <LandingPageLatestBlock />
      </Box>
      <LandingPageFooter />
    </Container>
  );
}

const LandingPageBrand = () => (
  <Typography
    sx={(theme) => ({
      fontFamily: "Century Gothic",
      textTransform: "uppercase",
      fontSize: "50px",
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "75px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "100px",
      },
    })}
  >
    Cuban<span style={{ fontWeight: "bold" }}>Link</span>
  </Typography>
);
const LandingPageText = () => (
  <Typography fontStyle="italic" paragraph>
    Welcome to the Cuban Link! Explore blocks, addresses, and transactions on
    the bitcoin blockchain.
  </Typography>
);
const LandingPageLatestBlock = () => {
  const api = new Api();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [hash, setHash] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await api.getLatestBlock();
        console.log(response.data.hash);
        setHash(response.data.hash);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!hash)
    return (
      <Typography fontStyle="italic" paragraph>
        Latest block is not availible
      </Typography>
    );

  return (
    <Typography fontStyle="italic" paragraph>
      Click here to view the latest block:{" "}
      <Link component={NavLink} to={`/block/${hash}`}>
        {hash}
      </Link>
    </Typography>
  );
};
const LandingPageFooter = () => (
  <Typography fontSize="10px" p={1}>
    This application leverages data from{" "}
    <Link href="https://www.blockchain.com/explorer/api/blockchain_api">
      Blockchain.com
    </Link>{" "}
    and{" "}
    <Link href="https://explorer.btc.com/btc/adapter?type=api-doc">
      BTC.com
    </Link>
  </Typography>
);
