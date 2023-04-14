import React from 'react';
import Home from './Components/Home.jsx';
import Error from './Components/Error.jsx';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import { UserProvider } from './Providers/UserProvider.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import './input.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<UserProvider />} errorElement={<Error />}>
      <Route index element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path=':currentFolder' element={<Home />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
