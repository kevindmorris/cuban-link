import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Brand() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <Typography
        fontSize="30px"
        fontWeight="normal"
        fontFamily="'Questrial', sans-serif"
        textTransform="uppercase"
      >
        Cuban<span style={{ fontWeight: "bold" }}>Link</span>
      </Typography>
    </div>
  );
}
