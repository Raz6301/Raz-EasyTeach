import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type Props = {
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: number;
  height?: string;
};

const Spinner: React.FC<Props> = ({
  size = 40,
  height = "50vh",
  color = "primary",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: { height },
      }}>
      <CircularProgress
        color={color}
        size={size}
        sx={{ alignSelf: "center" }}
      />
    </Box>
  );
};

export default Spinner;
