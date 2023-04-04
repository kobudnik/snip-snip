import React from 'react';
import Header from './Components/Header.jsx';
import Home from './Components/Home.jsx';
import Error from './Components/Error.jsx';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import { SessionProvider } from './contextProviders.jsx';
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
        <SessionProvider>
          <Outlet></Outlet>
        </SessionProvider>
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
