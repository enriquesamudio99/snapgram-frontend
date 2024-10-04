import { MainLayout } from '../../layouts';
import { 
  CreatePost, 
  UpdatePost,
  Home, 
  Post, 
} from '../../posts/pages';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'update-post/:postId', element: <UpdatePost /> },
      { path: 'post/:postId', element: <Post /> },
    ]
  }
];

export default privateRoutes;