import { useRoutes } from 'react-router-dom';
import { Login, Register, Passwd } from 'src/pages/users';
import Inicio from 'src/pages/Inicio';

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
