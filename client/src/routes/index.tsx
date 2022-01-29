import { useRoutes } from 'react-router-dom';
import { Login, Register } from 'src/pages/users';

export default function Rutas() {
  return useRoutes([
    {
      path: '/',
      element: <>element</>
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> }
  ]);
}
