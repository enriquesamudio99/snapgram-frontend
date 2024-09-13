import { AuthLayout } from '../../layouts';

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <h1>Login</h1> },
      { path: 'register', element: <h1>Register</h1> }
    ]
  }
];

export default authRoutes;