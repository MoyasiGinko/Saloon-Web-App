"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (newToken: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(() => {
    // Initialize accessToken from localStorage or null if not found
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    } else {
      return null;
    }
  });

  const setAccessToken: AuthContextType["setAccessToken"] = (newToken) => {
    // Update accessToken state and save it to localStorage
    setAccessTokenState(newToken);
    if (typeof window !== "undefined") {
      if (newToken) {
        localStorage.setItem("accessToken", newToken);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
  };

  useEffect(() => {
    // Update accessToken state if localStorage changes
    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("accessToken");
        setAccessTokenState(storedToken);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
