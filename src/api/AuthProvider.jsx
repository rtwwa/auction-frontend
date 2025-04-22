import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

axios.defaults.withCredentials = true;

export const AuthContext = createContext(null);

const API_BASE_URL = "http://localhost:3000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // 🔁 Проверка сессии при монтировании
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/me`);
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  const isAuthenticated = !!user;

  if (loadingAuth) {
    return <div>Загрузка...</div>; // Или спиннер
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
