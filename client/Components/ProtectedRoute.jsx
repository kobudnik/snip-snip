import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUsername } from '../ContextProviders/UserProvider';
import Header from './Header';
import { DataProvider } from '../ContextProviders/DataProvider.jsx';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { username, isAuthenticated, setAuthenticated } = useUsername();

  //username gets stored in local storage as per needs of the application (persist user status upon refresh)
  //sessions used for more sensitive data
  //therefore, if user goes to subroute, their username may still be in local storage, but we need to verify that they still have an active session
  //only if both of those things are true shall we grant access to the protected routes

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username }),
  };

  useEffect(() => {
    if (!isAuthenticated & !username) {
      navigate('/');
    }
  }, [isAuthenticated, username]);

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
  }, [username, isAuthenticated, navigate]);

  // const component = (
  //   <>
  //     <div className='header'>
  //       {' '}
  //       <a href='#'>Snippets Collection</a>{' '}
  //       <span className='welcome'>Welcome Back</span> <a href='#'>Logout</a>
  //     </div>
  //     <Outlet />
  //   </>
  // );

  return (
    <>
      {isAuthenticated && username ? (
        <>
          <DataProvider>
            <Header />
            <Outlet />
          </DataProvider>
        </>
      ) : null}
    </>
  );
}
