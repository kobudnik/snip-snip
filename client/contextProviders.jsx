import React, { createContext, useState, useContext } from 'react';

const usernameContext = createContext();
const updateUsernameContext = createContext();

export function useUsername() {
  return useContext(usernameContext);
}

export function useUpdateUsername() {
  return useContext(updateUsernameContext);
}

export function SessionProvider({ children }) {
  const [username, setUsername] = useState('Kennan');

  return (
    <usernameContext.Provider value={username}>
      <updateUsernameContext.Provider value={setUsername}>
        {children}
      </updateUsernameContext.Provider>
    </usernameContext.Provider>
  );
}
