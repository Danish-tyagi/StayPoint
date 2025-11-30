

import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext(null);

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (err) {
      console.error("Error fetching current user:", err);
      setUserData(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
   
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    loading,
    error,
    getCurrentUser
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
