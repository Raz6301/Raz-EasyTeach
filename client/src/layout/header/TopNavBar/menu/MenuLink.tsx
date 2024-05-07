import React from "react";
import NavBarLink from "../../../components/NavBarLink";
import { makeFirstLetterCapital } from "./utils/algoMethods";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  label: string;
  navigateTo: string;
  onClick: () => void;
  styles?: object;
};

const MenuLink: React.FC<Props> = ({
  label,
  navigateTo,
  onClick,
  styles = {},
}) => {
  return (
    <NavBarLink to={navigateTo} color="black">
      <MenuItem sx={{ ...styles }} onClick={onClick}>
        {makeFirstLetterCapital(label)}
      </MenuItem>
    </NavBarLink>
  );
};

export default MenuLink;
