import { MainLayout } from '../../layouts';
import { Communities, Community, CommunityPost, CreateCommunity, CreateCommunityPost, UpdateCommunityPost } from '../../communities/pages';
import { CreatePost, UpdatePost, Home, Post, Explore, Saved } from '../../posts/pages';
import { People, Profile, UpdateProfile } from '../../users/pages';

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
      { path: 'update-profile/:userId', element: <UpdateProfile /> },
      { path: 'people', element: <People /> },
      // Communities
      { path: 'communities', element: <Communities /> },
      { path: 'create-community', element: <CreateCommunity /> },
      { path: 'community/:communityId', element: <Community /> },
      { path: 'community/:communityId/create-post', element: <CreateCommunityPost /> },
      { path: 'community/:communityId/update-post/:postId', element: <UpdateCommunityPost /> },
      { path: 'community/:communityId/post/:postId', element: <CommunityPost /> },
    ]
  }
];

export default privateRoutes;