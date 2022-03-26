import { useRoutes } from 'react-router-dom';
import { Login, Register, Passwd } from '../pages/users';
import Inicio from '../pages/Inicio';

export default function Rutas() {
  return useRoutes([
    {
      path: '/',
      element: <Inicio />
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/passwd', element: <Passwd /> }
  ]);
}
