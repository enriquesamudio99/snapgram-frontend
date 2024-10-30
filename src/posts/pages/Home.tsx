import { useEffect } from "react";
import { IPost } from "../../types";
import { PostCard } from "../components";
import { useGetFollowingPosts } from "../hooks";
import { useInView } from 'react-intersection-observer';
import { Loader } from "../../common/components";

interface HomeResultsProps {
  isLoading: boolean;
  posts: IPost[] | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const HomeResults = ({ isLoading, posts, hasNextPage, fetchNextPage }: HomeResultsProps) => {

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) {
    return <p className="home__grid-message">Loading...</p>
  }

  if (!posts?.length) {
    return (
      <p className="home__grid-message">No posts yet</p>
    )
  }

  return (
    <>
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
      {hasNextPage && (
        <div className="home__grid-loader-container">
          <div
            ref={ref}
            className="home__grid-loader"
          >
            <Loader />
          </div>
        </div>
      )}
    </>
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
                posts={followingPostsQuery.data?.pages.flatMap((page) => page?.response?.posts as IPost[])}
                hasNextPage={followingPostsQuery.hasNextPage}
                fetchNextPage={followingPostsQuery.fetchNextPage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;