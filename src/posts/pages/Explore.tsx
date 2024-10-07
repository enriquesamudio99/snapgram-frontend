import { useState } from "react"
import { useGetPosts, useSearchPosts } from "../hooks";
import { PostItem } from "../components";
import { useAuth, useDebounce } from "../../common/hooks";
import { IAuthUser, IPost } from "../../types";

interface ExploreResultsProps {
  isLoading?: boolean;
  isFetching?: boolean;
  posts: IPost[] | undefined;
  user: IAuthUser;
}

const ExploreResults = ({ isLoading = false, isFetching = false, posts, user }: ExploreResultsProps) => {

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
    </div>
  )
}

const Explore = () => {

  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");

  const { getPostsQuery } = useGetPosts();

  const debouncedValue = useDebounce(searchValue, 800);
  const { searchPostsQuery } = useSearchPosts(debouncedValue);

  const posts = getPostsQuery.data?.response?.posts;
  const searchPosts = searchPostsQuery.data?.response?.posts;

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
              {searchValue !== "" ? `Search Term: ${searchValue}` : "Popular Today"}
            </h1>
          </div>
          <div className="explore__grid">
            {shouldShowSearchResults ? (
              <ExploreResults
                isFetching={searchPostsQuery.isFetching}
                posts={searchPosts}
                user={user}
              />
            ) : (
              <ExploreResults
                isLoading={getPostsQuery.isLoading}
                posts={posts}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Explore