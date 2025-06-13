import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      try {
        const { userToken, user } = JSON.parse(storedData);
        setToken(userToken);
        setUserData(user);
        setIsAuthenticated(!!userToken);
      } catch (err) {
        console.error("Error parsing stored data:", err);
        localStorage.removeItem("user_data");
      }
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("user_data", JSON.stringify({ userToken: token, user }));
    setToken(token);
    setUserData(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user_data");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, userData, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





