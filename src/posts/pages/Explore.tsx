import { useEffect, useState } from "react"
import { useGetPosts, useSearchPosts } from "../hooks";
import { PostItem } from "../components";
import { useAuth, useDebounce } from "../../common/hooks";
import { IAuthUser, IPost } from "../../types";
import { useInView } from "react-intersection-observer";
import { Loader } from "../../common/components";

interface ExploreResultsProps {
  isLoading?: boolean;
  isFetching?: boolean;
  posts: IPost[] | undefined;
  user: IAuthUser;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const ExploreResults = ({ isLoading = false, isFetching = false, posts, user, hasNextPage, fetchNextPage }: ExploreResultsProps) => {

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading || isFetching) {
    return <p className="explore-results__message">Loading...</p>;
  }

  if (!posts?.length) {
    return <p className="explore-results__message">No Results</p>
  }

  return (
    <div className="explore-results">
      <div className="explore-results__grid">
        {posts.map(post => (
          <PostItem
            key={post._id}
            post={post}
            user={user}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className="explore-results__loader-container">
          <div
            ref={ref}
            className="explore-results__loader"
          >
            <Loader />
          </div>
        </div>
      )}
    </div>
  )
}

const Explore = () => {

  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");

  const { getPostsQuery } = useGetPosts();

  const debouncedValue = useDebounce(searchValue, 800);
  const { searchPostsQuery } = useSearchPosts(debouncedValue);

  const posts = getPostsQuery.data?.pages.flatMap((page) => page?.response?.posts as IPost[]);
  const searchPosts = searchPostsQuery.data?.pages.flatMap((page) => page?.response?.posts as IPost[]);

  const shouldShowSearchResults = searchValue !== "";

  return (
    <section className="main-content__wrapper">
      <div className="explore">
        <div className="explore__container">
          <div className="explore__search">
            <p className="explore__search-title">Search Posts</p>
            <input
              type="text"
              className="explore__search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Posts"
            />
          </div>
          <div className="explore__results">
            <h1 className="explore__results-title">
              {searchValue !== "" ? `Search Term: ${searchValue}` : "Most Recent"}
            </h1>
          </div>
          <div className="explore__grid">
            {shouldShowSearchResults ? (
              <ExploreResults
                isFetching={searchPostsQuery.isFetching}
                posts={searchPosts}
                user={user}
                hasNextPage={searchPostsQuery.hasNextPage}
                fetchNextPage={searchPostsQuery.fetchNextPage}
              />
            ) : (
              <ExploreResults
                isLoading={getPostsQuery.isLoading}
                posts={posts}
                user={user}
                hasNextPage={getPostsQuery.hasNextPage}
                fetchNextPage={getPostsQuery.fetchNextPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Explore