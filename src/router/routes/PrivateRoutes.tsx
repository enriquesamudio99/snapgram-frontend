import { MainLayout } from '../../layout';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />, // Aquí va el layout o estructura
    children: [
      { path: '', element: <h1>Home</h1> },
      { path: 'profile', element: <h1>Profile</h1> }
    ]
  }
];

export default privateRoutes;