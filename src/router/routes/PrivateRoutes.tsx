import { MainLayout } from '../../layouts';
import { CreatePost, Home, Post } from '../../posts/pages';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'post/:postId', element: <Post /> }
    ]
  }
];

export default privateRoutes;