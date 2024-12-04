import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(
    Boolean(sessionStorage.getItem("access-token"))
  );
  const navigate = useNavigate(); 

  useEffect(() => {
    Boolean(sessionStorage.getItem("access-token")) && setIsAuthenticatedState(true);
  }, []);

  const login = (auth_token) => {
    sessionStorage.setItem("access-token", auth_token);
    setIsAuthenticatedState(true);
    navigate("/"); 
  };

  const logout = () => {
    sessionStorage.removeItem("access-token");
    setIsAuthenticatedState(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticatedState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
