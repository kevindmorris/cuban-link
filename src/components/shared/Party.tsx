import { Typography } from "@mui/material";

import ElementAvatar from "./ElementAvatar";
import FormattedLink from "./FormattedLink";
import { formatAmount } from "../../common/utils";

const Party = ({ addr, amount }: { addr?: string; amount: number }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}
  >
    <ElementAvatar type="address" size="xs" />
    <div style={{ flex: 1, overflow: "hidden" }}>
      <Typography noWrap>
        {addr ? (
          <FormattedLink variant="address">{addr}</FormattedLink>
        ) : (
          "Unknown"
        )}
      </Typography>
      <Typography noWrap>{formatAmount(amount / 100000000)} BTC</Typography>
    </div>
  </div>
);

export default Party;
