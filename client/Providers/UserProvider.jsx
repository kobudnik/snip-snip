import React, { createContext, useState, useContext, useMemo } from 'react';

import { Outlet } from 'react-router-dom';

const UserContext = createContext();

export function useUsername() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || null,
  );

  const [isAuthenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   // update state whenever local storage changes
  //   const handleStorageChange = () => {
  //     setUsername(localStorage.getItem('username') || '');
  //   };
  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  const user = useMemo(
    () => ({
      username,
      setUsername,
      isAuthenticated,
      setAuthenticated,
    }),
    [username, isAuthenticated],
  );

  return (
    <UserContext.Provider value={user}>
      <Outlet />
    </UserContext.Provider>
  );
}
