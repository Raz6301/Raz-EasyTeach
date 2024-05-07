import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: ReactNode;
  color?: string;
};

const NavBarLink: React.FC<Props> = ({ to, children, color = "#fff" }) => {
  return (
    <Link to={to} style={{ color, textDecoration: "none" }}>
      {children}
    </Link>
  );
};

export default NavBarLink;
