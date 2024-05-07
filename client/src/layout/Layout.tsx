import React, { ReactNode } from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
