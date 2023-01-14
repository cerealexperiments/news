import {createContext, PropsWithChildren, useState} from "react";

type AuthContextType = {
  isLoggedIn: boolean,
  token: string | null,
  login: () => void,
  logout: () => void
}


const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = () => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
      setToken(localStorage.getItem("token"));
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setToken("");
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      token: token,
      login: login,
      logout: logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
