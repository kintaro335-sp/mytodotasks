import React from 'react';
import { useRoutes } from 'react-router-dom';

const Inicio = React.lazy(() => import('../pages/Inicio'));
const Login = React.lazy(() => import('../pages/users/Login'));
const Register = React.lazy(() => import('../pages/users/Register'));
const Passwd = React.lazy(() => import('../pages/users/Passwd'));

export default function Rutas() {
  return useRoutes([
    {
      path: '/',
      element: <Inicio />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/passwd',
      element: <Passwd />
    }
  ]);
}
