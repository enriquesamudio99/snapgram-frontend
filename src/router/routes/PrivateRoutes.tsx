import { MainLayout } from '../../layouts';
import { CreatePost, Home } from '../../posts/pages';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'create-post', element: <CreatePost /> }
    ]
  }
];

export default privateRoutes;