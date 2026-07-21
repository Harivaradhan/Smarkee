import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredUser, getStoredToken, removeStoredAuth, setStoredAuth } from '../utils/storage.js';
import authService from '../services/authService.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setStoredAuth(token, user);
    }
  }, [token, user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      const authToken = response.token || response.accessToken;
      const authUser = response.user || response;
      setToken(authToken);
      setUser(authUser);
      setStoredAuth(authToken, authUser);
      return authUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeStoredAuth();
    navigate('/login');
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
