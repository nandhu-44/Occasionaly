"use client";
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("/api/get-user-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      // Setup user data
      setUser(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token from local storage

    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false); // No token found, so stop loading
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
        setLoading,
        setError,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
