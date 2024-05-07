import React, { useState, useContext, useCallback, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type ContextArgs = (color: Color, message: string, variant?: Variant) => void;
type Color = "success" | "error" | "info" | "warning";
type Variant = "filled" | "outlined" | "standard";

const SnackbarContext = React.createContext<null | ContextArgs>(null);

type Props = {
  children: ReactNode;
};

export const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("in snackbar!");
  const [snackColor, setSnackColor] = useState<Color>("success");
  const [snackVariant, setSnackVariant] = useState<Variant>("filled");

  const setSnack = useCallback(
    (color: Color, message: string, variant: Variant = "filled") => {
      setOpenSnack(true);
      setSnackColor(color);
      setSnackMessage(message);
      setSnackVariant(variant);
    },
    [setOpenSnack, setSnackColor, setSnackMessage, setSnackVariant]
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackOpen}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={5000}
      >
        <Alert severity={snackColor} variant={snackVariant}>
          {snackMessage}
        </Alert>
      </Snackbar>

      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnack must be used within a SnackbarProvider");
  return context;
};
