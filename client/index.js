import React from 'react';
import Header from './Components/Header.jsx';
import Home from './Components/Home.jsx';
import Error from './Components/Error.jsx';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import { UserProvider } from './ContextProviders.jsx';

// import CreateAccount from './routes/CreateAccount.jsx';
// import Home, { eventLoader } from './routes/Home.jsx';
// import Error from './components/Error.jsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <>
      {
        <UserProvider>
          <Outlet></Outlet>
        </UserProvider>
      }
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Login />}></Route>
      <Route path='create' element={<Signup></Signup>}></Route>
      <Route path='home' element={<Header />}>
        <Route index element={<Home />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);

/* import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

const UserContext = createContext();

export function useUsername() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || null,
  );

  const updateUsername = (username) => {
    localStorage.setItem('username', username);
  };

  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // update state whenever local storage changes
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const user = useMemo(
    () => ({
      username,
      updateUsername,
      isAuthenticated,
      setAuthenticated,
    }),
    [username, isAuthenticated],
  );

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;










  import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

const UserContext = createContext();

export function useUsername() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || null,
  );

  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // update state whenever local storage changes
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const user = useMemo(
    () => ({
      username,
      setUsername,
      isAuthenticated,
      setAuthenticated,
    }),
    [username, isAuthenticated],
  );

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

}*/
