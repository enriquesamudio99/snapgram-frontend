import { useAuth } from "../../common/hooks";
import { IAuthUser, IUser } from "../../types";
import { useGetUsersByCreatedPosts } from "../hooks";
import { TopCreatorItem } from "./";

interface TopCreatorsResultsProps {
  currentUser: IAuthUser;
  users: IUser[] | undefined;
  isLoading?: boolean;
}

const TopCreatorsResults = ({ currentUser, users, isLoading } : TopCreatorsResultsProps) => { 

  if (isLoading) {
    return <p className="top-creators-results__message">Loading...</p>;
  }

  if (!users?.length) {
    return <p className="top-creators-results__message">There are no users</p>;
  }

  return (
    users.map(user => (
      <TopCreatorItem 
        key={user._id}
        currentUser={currentUser}
        user={user}
      />
    ))
  )
}

const TopCreators = () => {

  const { user: currentUser } = useAuth();
  const { getUsersByCreatedPostsQuery } = useGetUsersByCreatedPosts();

  return (
    <aside className="top-creators">
      <div className="top-creators__container">
        <h2 className="top-creators__title">Top Creators</h2>
        <div className="top-creators__grid">
          <TopCreatorsResults 
            currentUser={currentUser}
            users={getUsersByCreatedPostsQuery.data?.response?.users}
            isLoading={getUsersByCreatedPostsQuery.isLoading}
          />
        </div>
      </div>
    </aside>
  )
}

export default TopCreators