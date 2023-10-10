import { CircularProgress } from "@mui/material";

export default function LoadingSpinner({ noFlex }: { noFlex?: boolean }) {
  return (
    <div
      style={{
        flex: noFlex ? undefined : 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
}
