// src/context/UserContext.jsx
"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use refs to track initialization and prevent unnecessary fetches
  const isInitialized = useRef(false);
  const currentToken = useRef(null);

  // Track pathname changes
  const pathname = usePathname();

  const fetchUserData = useCallback(
    async (token) => {
      try {
        // Skip if we already have user data and using the same token
        if (user && token === currentToken.current) {
          setLoading(false);
          return;
        }

        const response = await fetch("/api/get-user-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // Add cache control headers
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
        currentToken.current = token;
      } catch (error) {
        setError(error.message);
        setUser(null);
        currentToken.current = null;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  // Handle user logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    currentToken.current = null;
    setError(null);
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (isInitialized.current) return;

    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }

    isInitialized.current = true;
  }, [fetchUserData]);

  // Token refresh/validation effect
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      // If we have a token but no user data, fetch it
      if (token && !user && !loading) {
        await fetchUserData(token);
      }

      // If we have no token but have user data, clear it
      if (!token && user) {
        logout();
      }
    };

    validateToken();
  }, [pathname, fetchUserData, user, loading, logout]);

  const contextValue = {
    user,
    loading,
    error,
    setUser,
    setLoading,
    setError,
    fetchUserData,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
