import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type BreakPointsKeysType = "xs" | "sm" | "md" | "lg" | "xl";
type BreakPointValueType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Props = {
  text: string;
  to: string;
  breakPoints?: Partial<Record<BreakPointsKeysType, BreakPointValueType>>;
};

const FormLink: React.FC<Props> = ({ text, to, breakPoints }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} {...breakPoints}>
      <Button variant="text" onClick={() => navigate(to)}>
        <Typography variant="body2">
          {text}
          <Typography component="span" variant="subtitle2">
            {" "}
            Click here...
          </Typography>
        </Typography>
      </Button>
    </Grid>
  );
};

export default FormLink;
