import { Communities, CreateCommunity } from '../../communities/pages';
import { MainLayout } from '../../layouts';
import { 
  CreatePost, 
  UpdatePost,
  Home, 
  Post,
  Explore, 
  Saved
} from '../../posts/pages';
import { People, Profile } from '../../users/pages';

const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Posts
      { path: '', element: <Home /> },
      { path: 'create-post', element: <CreatePost /> },
      { path: 'update-post/:postId', element: <UpdatePost /> },
      { path: 'post/:postId', element: <Post /> },
      { path: 'explore', element: <Explore /> },
      { path: 'saved', element: <Saved /> },
      // Users
      { path: 'profile/:userId', element: <Profile /> },
      { path: 'people', element: <People /> },
      // Communities
      { path: 'communities', element: <Communities /> },
      { path: 'create-community', element: <CreateCommunity /> },
    ]
  }
];

export default privateRoutes;