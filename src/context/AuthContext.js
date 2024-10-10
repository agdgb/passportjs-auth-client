import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>
{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    const savedToken = localStorage.getItem("token");
    if (savedToken)
    {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (newToken, refreshToken) =>
  {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () =>
  {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
