import React, { createContext, useState, useContext, useMemo } from 'react';

import { Outlet } from 'react-router-dom';

const UserContext = createContext();

export function useUsername() {
  return useContext(UserContext);
}

export function UserProvider() {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || '',
  );

  const [isAuthenticated, setAuthenticated] = useState(false);

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
