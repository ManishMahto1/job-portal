import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getMe().then(setUser).catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = async (email, password) => {
    const { token, role } = await authService.login(email, password);
    localStorage.setItem('token', token);
    setUser({ role, ...user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Provide value explicitly
  const value = { user, login, logout };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;