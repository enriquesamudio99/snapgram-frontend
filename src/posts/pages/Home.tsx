import { PostCard } from "../components";
import { useGetFollowingPosts } from "../hooks";

const Home = () => {

  const { followingPostsQuery } = useGetFollowingPosts();

  if (followingPostsQuery.isLoading) {
    return <p>Loading...</p>
  }

  const posts = followingPostsQuery.data?.response?.data.data;

  return (
    <>
      <section className="main-content__wrapper">
        <div className="home">
          <div className="home__container">
            <h2 className="home__title">Home Feed</h2>
            <div className="home__grid">
              {posts && posts.length > 0 ? (
                <ul className="home__grid-list">
                  {posts.map(post => (
                    <li 
                      className="home__grid-list-item"
                      key={post._id}
                    >
                      <PostCard 
                        post={post}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>There are no posts</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;