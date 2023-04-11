import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUsername } from '../Providers/UserProvider';
import Header from './Header';
import { DataProvider } from '../Providers/DataProvider.jsx';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { username, isAuthenticated, setAuthenticated } = useUsername();

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username }),
  };

  useEffect(() => {
    if (!username) {
      navigate('/');
    } else if (!isAuthenticated) {
      fetch('/api/session/checkStatus', requestOptions)
        .then((res) => {
          if (!res.ok) {
            setAuthenticated(false);
            throw {
              message:
                'HTTP error, status = ' + res.message + ' status ' + res.status,
            };
          }
          setAuthenticated(true);
        })
        .catch((e) => {
          console.log(e.message);
          navigate('/');
        });
    }
  }, [username, isAuthenticated]);

  return (
    <>
      {isAuthenticated && username ? (
        <>
          <DataProvider>
            <Header>
              <Outlet />
            </Header>
          </DataProvider>
        </>
      ) : null}
    </>
  );
}
