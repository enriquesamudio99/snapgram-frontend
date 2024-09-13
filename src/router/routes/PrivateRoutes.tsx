import { MainLayout } from '../../layouts';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <h1>Home</h1> },
      { path: 'profile', element: <h1>Profile</h1> }
    ]
  }
];

export default privateRoutes;