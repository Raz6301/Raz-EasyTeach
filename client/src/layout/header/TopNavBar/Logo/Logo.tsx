import React from "react";
import Typography from "@mui/material/Typography";
import NavBarLink from "../../../components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";

const Logo = () => {
  return (
    <NavBarLink to={ROUTES.ROOT}>
      <Typography
        variant="h4"
        sx={{
          display: { xs: "none", md: "inline-flex" },
          marginRight: 2,
          fontFamily: "fantasy",
        }}
      >
        EasyTeach
      </Typography>
    </NavBarLink>
  );
};

export default Logo;
