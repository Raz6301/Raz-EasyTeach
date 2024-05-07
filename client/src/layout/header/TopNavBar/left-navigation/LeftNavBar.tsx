import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import NavItem from "../../../components/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {
  const { user } = useUser();

  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem label="About" to={ROUTES.ABOUT} />
        {user && <NavItem label="Calendar" to={ROUTES.CALENDAR} />}
        {user && user.isBusiness && (
          <NavItem label="Management" to={ROUTES.MANAGEMENT} />
        )}
        {user && user.isBusiness && (
          <NavItem label="Statistic" to={ROUTES.STATISTIC} />
        )}

        {user && user.isAdmin && <NavItem label="crm" to={ROUTES.CRM} />}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
