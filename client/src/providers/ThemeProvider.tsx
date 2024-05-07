import React, {
  useState,
  useContext,
  ReactNode,
  /* SetStateAction, */
  useMemo,
  useCallback,
} from "react";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

type ContextArgs = {
  isDark: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = React.createContext<null | ContextArgs>(null);

type Props = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setDark] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });
  const toggleDarkMode = useCallback(() => {
    setDark((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    return { isDark, toggleDarkMode };
  }, [isDark, toggleDarkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      {" "}
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export default ThemeProvider;
