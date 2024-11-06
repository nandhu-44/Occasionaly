"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Loader from "@/common/components/Loader";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isInitialized = useRef(false);
  const currentToken = useRef(null);

  const pathname = usePathname();

  const fetchUserData = useCallback(
    async (token) => {
      try {
        if (user && token === currentToken.current) {
          setLoading(false);
          return;
        }

        const response = await fetch("/api/get-user-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    currentToken.current = null;
    setError(null);
  }, []);

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

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      // Only fetch if not loading and user data is missing
      if (token && !user && !loading) {
        await fetchUserData(token);
      }

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

  return loading ? <Loader /> : (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
