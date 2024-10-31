import { Link } from "react-router-dom"
import { ICommunity } from "../../types";
import { useGetCommunities, useSearchCommunities } from "../hooks";
import { CommunityItem } from "../components";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Loader } from "../../common/components";
import { useDebounce } from "../../common/hooks";

interface CommunitiesResults {
  communities: ICommunity[] | undefined;
  isLoading?: boolean;
  isFetching?: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const CommunitiesResults = ({ communities, isLoading = false, isFetching = false, hasNextPage, fetchNextPage }: CommunitiesResults) => {

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading || isFetching) {
    return <p className="communities-results__message">Loading...</p>;
  }

  if (!communities?.length) {
    return <p className="communities-results__message">There are no communities</p>;
  }

  return (
    <div className="communities-results">
      <div className="communities-results__grid">
        {communities.map(community => (
          <CommunityItem
            key={community._id}
            community={community}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className="communities-results__loader-container">
          <div
            ref={ref}
            className="communities-results__loader"
          >
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}

const Communities = () => {

  const [searchValue, setSearchValue] = useState<string>("");

  const { getCommunitiesQuery } = useGetCommunities();

  const debouncedValue = useDebounce(searchValue, 800);
  const { searchCommunitiesQuery } = useSearchCommunities(debouncedValue);

  const communities = getCommunitiesQuery.data?.pages?.flatMap((page) => page?.response?.communities as ICommunity[]);;
  const searchCommunities = searchCommunitiesQuery.data?.pages?.flatMap((page) => page?.response?.communities as ICommunity[]);;

  const shouldShowSearchResults = searchValue !== "";

  return (
    <section className="main-content__wrapper">
      <div className="communities">
        <div className="communities__container">
          <div className="communities__search">
            <p className="communities__search-title">Search Communities</p>
            <input
              type="text"
              className="communities__search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Communities"
            />
          </div>
          <div className="communities__results">
            <h2 className="communities__results-title">
              {searchValue !== "" ? (
                <>
                  Search Term: {searchValue}
                </>
              ) : (
                <>
                  <img
                    src="/assets/icons/white-users.svg"
                    alt="communities Icon"
                    className="communities__results-title-img"
                  />
                  Communities
                </>
              )}
            </h2>
            <Link
              to="/create-community"
              className="communities__results-create-btn"
            >
              Create One
            </Link>
          </div>
          <div className="communities__grid">
            {shouldShowSearchResults ? (
              <CommunitiesResults
                communities={searchCommunities}
                isFetching={searchCommunitiesQuery.isFetching}
                hasNextPage={searchCommunitiesQuery.hasNextPage}
                fetchNextPage={searchCommunitiesQuery.fetchNextPage} 
              />
            ) : (
              <CommunitiesResults
                communities={communities}
                isLoading={getCommunitiesQuery.isLoading}
                hasNextPage={getCommunitiesQuery.hasNextPage}
                fetchNextPage={getCommunitiesQuery.fetchNextPage} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Communities