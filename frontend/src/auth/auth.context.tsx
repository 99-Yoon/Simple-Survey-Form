import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import { IUser } from "../types";
import { getLocalUser, handleLogin, handleLogout } from "./auth.helper";

interface IAuthContext {
  login: (email: string, password: string, cb?: VoidFunction) => Promise<void>;
  logout: (cb?: VoidFunction) => Promise<void>;
  user: IUser;
}

const AuthContext = createContext<IAuthContext>({
  login: async () => {},
  logout: async () => {},
  user: { isLoggedIn: false },
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(getLocalUser());

  const login = async (
    email: string,
    password: string,
    cb: VoidFunction = () => {}
  ) => {
    const user = await handleLogin(email, password);
    setUser(user);
    cb();
  };

  const logout = async (cb: VoidFunction = () => {}) => {
    await handleLogout();
    setUser({ ...user, isLoggedIn: false });
    cb();
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
