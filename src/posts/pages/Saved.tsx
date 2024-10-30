import { PostItem } from "../components";
import { useAuth } from "../../common/hooks";
import { useGetSavedPosts } from "../hooks";
import { IAuthUser, IPost } from "../../types";

interface SavedResultsProps {
  isLoading: boolean;
  posts: IPost[] | undefined;
  user: IAuthUser;
}

const SavedResults = ({ isLoading, posts, user }: SavedResultsProps) => {
  if (isLoading) {
    return <p className="saved__message">Loading...</p>
  }

  if (!posts?.length) {
    return (
      <p className="saved__message">No posts yet</p>
    )
  }

  return (
    <>
      {posts.map(post => (
        <PostItem
          key={post._id}
          post={post}
          user={user}
          showUser={false}
          showStats={false}
        />
      ))}
    </>
  )
}

const Saved = () => {

  const { user } = useAuth();
  const { savedPostsQuery } = useGetSavedPosts();

  return (
    <section className="main-content__wrapper">
      <div className="saved">
        <div className="saved__container">
          <h2 className="saved__title">
            <img
              src="/assets/icons/white-bookmark.svg"
              alt="Bookmark Icon"
              className="saved__title-img"
            />
            Saved Posts
          </h2>
          <div className="saved__grid">
            <SavedResults 
              isLoading={savedPostsQuery.isLoading}
              posts={savedPostsQuery.data?.response?.posts}
              user={user}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Saved