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
        variant="h5"
        fontWeight="normal"
        fontFamily="Century Gothic"
        textTransform="uppercase"
      >
        Cuban<span style={{ fontWeight: "bold" }}>Link</span>
      </Typography>
    </div>
  );
}
