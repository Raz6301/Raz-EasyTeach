import React from "react";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

type Props = { title: string; subtitle: string };

const PageHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <>
      <Typography variant="h3" component={"h1"} padding={1}>
        {title}
      </Typography>
      <Typography variant="h5" component={"h2"}>
        {subtitle}
      </Typography>
      <Divider
        sx={{
          width: "8vw",
          my: 1,
          borderColor: "#B47C52",
          fontWeight: "10",
          borderWidth: 3,
        }}
      />
    </>
  );
};

export default PageHeader;
