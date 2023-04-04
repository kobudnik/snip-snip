import React, { createContext, useState, useContext, useMemo } from 'react';

const UserContext = createContext();

export function useUsername() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState('Howdy');
  const user = useMemo(
    () => ({
      username,
      setUsername,
    }),
    [username],
  );

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
