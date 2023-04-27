/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Home from './Components/Home';
import Error from './Components/Error';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { UserProvider } from './Providers/UserProvider';
import ProtectedRoute from './Components/ProtectedRoute';
import './input.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<UserProvider />} errorElement={<Error />}>
      <Route index element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path=':currentFolder' element={<Home />} />
      </Route>
    </Route>,
  ),
);

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
