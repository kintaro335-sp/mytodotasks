import { useRoutes } from 'react-router-dom';
import { Login } from 'src/pages/users';

export default function Rutas() {
  return useRoutes([
    {
      path: '/',
      element: <>element</>
    },
    { path: '/login', element: <Login /> }
  ]);
}
