import { MainLayout } from '../../layouts';
import { 
  CreatePost, 
  UpdatePost,
  Home, 
  Post,
  Explore, 
  Saved
} from '../../posts/pages';
import { Profile } from '../../users/pages';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'update-post/:postId', element: <UpdatePost /> },
      { path: 'post/:postId', element: <Post /> },
      { path: 'explore', element: <Explore /> },
      { path: 'saved', element: <Saved /> },
      { path: 'profile/:userId', element: <Profile /> }
    ]
  }
];

export default privateRoutes;