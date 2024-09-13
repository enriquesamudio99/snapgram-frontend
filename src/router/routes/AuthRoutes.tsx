import { AuthLayout } from '../../layouts';
import { Login, Register } from '../../auth/pages';

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  }
];

export default authRoutes;