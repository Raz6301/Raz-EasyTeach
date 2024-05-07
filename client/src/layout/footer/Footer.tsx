import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <Paper
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        {user && (
          <BottomNavigationAction
            label="Calendar"
            icon={<CalendarMonthIcon />}
            onClick={() => navigate(ROUTES.CALENDAR)}
          />
        )}
        {user && user.isBusiness && (
          <BottomNavigationAction
            label="Management"
            icon={<FactCheckIcon />}
            onClick={() => navigate(ROUTES.MANAGEMENT)}
          />
        )}
        {user && user.isBusiness && (
          <BottomNavigationAction
            label="Statistics"
            icon={<AssessmentIcon />}
            onClick={() => navigate(ROUTES.STATISTIC)}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
