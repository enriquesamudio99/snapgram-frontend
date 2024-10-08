import { PostItem } from "../components";
import { useAuth } from "../../common/hooks";
import { useGetSavedPosts } from "../hooks";

const Saved = () => {

  const { user } = useAuth();
  const { savedPostsQuery } = useGetSavedPosts();

  if (savedPostsQuery.isLoading) {
    return <p>Loading...</p>;
  }

  const posts = savedPostsQuery.data?.response?.posts;

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
            {posts && posts.length > 0 ? (
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
            ) : (
              <p className="saved__message">You have not saved any post</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Saved