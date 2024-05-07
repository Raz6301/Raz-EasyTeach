import React, {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  useMemo,
  useEffect,
} from "react";
import { TokenType } from "../models/types/userTypes";
import { getUser } from "../services/LocalStorageService";

type ContextArgs = {
  user: null | TokenType;
  setUser: (value: SetStateAction<null | TokenType>) => void;
  token: null | string;
  setToken: (value: SetStateAction<null | string>) => void;
};

const UserContext = React.createContext<null | ContextArgs>(null);

type Props = {
  children: ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<null | TokenType>(null);
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();
      setUser(userFromLocalStorage);
    }
  }, [user]);

  const value = useMemo(() => {
    return { user, setUser, token, setToken };
  }, [user, setUser, token, setToken]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export default UserProvider;
