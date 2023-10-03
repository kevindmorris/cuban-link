import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Brand() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <img
        src="the-cuban-link/assets/cuban-link-logo.png"
        alt=""
        style={{ height: 25 }}
      />
      <Typography fontSize="25px" fontWeight="bolder" ml={0.5}>
        Cuban Link
      </Typography>
    </div>
  );
}
