import React, { ReactNode } from "react";
import Paper from "@mui/material/Paper";
import { useTheme } from "../../providers/ThemeProvider";

type Props = {
  children: ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <Paper
      sx={{
        minHeight: "90vh",
        backgroundColor: isDark ? "#333333" : "fffff",
      }}
    >
      {children}
    </Paper>
  );
};

export default Main;
