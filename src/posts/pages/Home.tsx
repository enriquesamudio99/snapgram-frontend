import { IPost } from "../../types";
import { PostCard } from "../components";
import { useGetFollowingPosts } from "../hooks";

interface HomeResultsProps {
  isLoading: boolean;
  posts: IPost[] | undefined;
}

const HomeResults = ({ isLoading, posts } : HomeResultsProps) => {

  if (isLoading) {
    return <p className="home__grid-message">Loading...</p>
  }

  if (!posts?.length) {
    return (
      <p className="home__grid-message">No posts yet</p>
    )
  }

  return (
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
  )
}

const Home = () => {

  const { followingPostsQuery } = useGetFollowingPosts();

  return (
    <>
      <section className="main-content__wrapper">
        <div className="home">
          <div className="home__container">
            <h2 className="home__title">Home Feed</h2>
            <div className="home__grid">
              <HomeResults 
                isLoading={followingPostsQuery.isLoading}
                posts={followingPostsQuery.data?.response?.posts}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;