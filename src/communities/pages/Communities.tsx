import { Link } from "react-router-dom"
import { ICommunity } from "../../types";
import { useGetCommunities } from "../hooks";
import { CommunityItem } from "../components";

interface CommunitiesResults {
  communities: ICommunity[] | undefined;
  isLoading: boolean; 
}

const CommunitiesResults = ({ communities, isLoading }: CommunitiesResults) => {

  if (isLoading) {
    return <p className="communities__message">Loading...</p>;
  }
  
  if (!communities?.length) {
    return <p className="communities__message">There are no communities</p>;
  }

  return (
    <div className="communities__grid">
      {communities.map(community => (
        <CommunityItem 
          key={community._id}
          community={community}
        />
      ))}
    </div>
  );
}

const Communities = () => {

  const { getCommunitiesQuery } = useGetCommunities();

  const communities = getCommunitiesQuery.data?.response?.communities;

  return (
    <section className="main-content__wrapper">
      <div className="communities">
        <div className="communities__container">
          <header className="communities__header">
            <h2 className="communities__title">
              <img
                src="/assets/icons/white-users.svg"
                alt="communities Icon"
                className="communities__title-img"
              />
              Communities
            </h2>
            <Link 
              to="/create-community"
              className="communities__create-btn"  
            >
              Create One
            </Link>
          </header>
          <CommunitiesResults 
            communities={communities}
            isLoading={getCommunitiesQuery.isLoading}
          />
        </div>
      </div>
    </section>
  )
}

export default Communities