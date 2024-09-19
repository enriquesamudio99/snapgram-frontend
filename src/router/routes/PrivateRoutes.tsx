import { MainLayout } from '../../layouts';
import { Home } from '../../posts/pages';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'profile', element: <h1>Profile</h1> }
    ]
  }
];

export default privateRoutes;