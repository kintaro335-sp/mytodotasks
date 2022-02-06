import { useRoutes } from 'react-router-dom';
import { Login, Register } from 'src/pages/users';
import Inicio from 'src/pages/Inicio';

export default function Rutas() {
  return useRoutes([
    {
      path: '/',
      element: <Inicio />
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> }
  ]);
}
