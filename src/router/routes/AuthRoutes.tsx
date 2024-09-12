import { AuthLayout } from '../../layout';

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />, // Aquí va el layout o estructura
    children: [
      { path: 'login', element: <h1>Login</h1> },
      { path: 'register', element: <h1>Register</h1> }
    ]
  }
];

export default authRoutes;