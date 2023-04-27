import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUsername } from '../Providers/UserProvider';
import Header from './Header';
import { DataProvider } from '../Providers/DataProvider';

function ProtectedRoute() {
  const navigate = useNavigate();
  const { username, isAuthenticated, setAuthenticated } = useUsername();

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    };
    if (!username) {
      navigate('/');
    } else if (!isAuthenticated) {
      fetch('/api/session/checkStatus', requestOptions)
        .then((res) => {
          if (!res.ok) {
            setAuthenticated(false);
            throw new Error(
              `HTTP error, message: ${res.message}, status ${res.status}`,
            );
          }
          setAuthenticated(true);
        })
        .catch((e) => {
          console.log(e.message);
          navigate('/');
        });
    }
  }, [username, isAuthenticated]);

  return isAuthenticated && username ? (
    <div className='flex flex-col min-h-screen relative'>
      <DataProvider>
        <Header>
          <Outlet />
        </Header>
      </DataProvider>
    </div>
  ) : null;
}

export default ProtectedRoute;
