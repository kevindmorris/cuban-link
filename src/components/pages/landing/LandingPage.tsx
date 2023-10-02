import React from "react";
import { Api } from "../../../services/Api";
import moment from "moment";
import { useAppDispatch } from "../../../state/hooks";
import { getBlock } from "../../../state/slices/blockSlice";
import {
  Box,
  Container,
  Divider,
  Link,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      }}
    >
      <Box sx={{ pt: 6, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          The Cuban Link
        </Typography>
        <Typography variant="h5" noWrap={false}>
          Explore activity on the blockchain. Select the latest block below to
          see recent transactions or search for a specific block, address, or
          transaction in the search bar.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Divider flexItem>
          <LatestBlock />
        </Divider>
      </Box>
      <Box sx={{ pb: 1 }}>
        <Typography variant="caption">
          This application leverages data from{" "}
          <Link href="https://www.blockchain.com/explorer/api/blockchain_api">
            Blockchain.com
          </Link>{" "}
          and{" "}
          <Link href="https://explorer.btc.com/btc/adapter?type=api-doc">
            BTC.com
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

const LatestBlock = () => {
  const navigate = useNavigate();

  const api = new Api();

  const [hash, setHash] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      try {
        const response = await api.getLatestBlock();
        console.log(response.data.hash);
        setHash(response.data.hash);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <StyledBlock text={hash} onClick={() => navigate(`/block/${hash}`)} />;
};

const StyledBlock = styled(
  (
    props: { text: string } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  ) => (
    <div
      {...props}
      children={props.text.slice(0, 5) + "-" + props.text.slice(-5)}
    />
  )
)(({ theme }) => ({
  maxWidth: 200,
  width: "25vw",
  aspectRatio: "1 / 1",
  color: theme.palette.text.disabled,
  background: `linear-gradient(to left top, ${alpha(
    theme.palette.warning.main,
    0.75
  )}, ${alpha(theme.palette.error.main, 1)})`,
  borderRadius: theme.spacing(0.5),
  cursor: "pointer",
  transition: "all 0.25s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...theme.typography.h6,
  [`&:hover`]: {
    maxWidth: 225,
    width: "35vw",
    ...theme.typography.h5,
  },
}));
