import { ICommunity, IUser } from "../../types";
import { RequestUserItem } from "../../users/components";
import { useGetRequestsByCommunity } from "../hooks";

interface CommunityMembersProps {
  community: ICommunity;
}

interface CommunityMembersResultsProps {
  communityId: string;
  users: IUser[] | undefined;
  isLoading: boolean;
}

const CommunityMembersResults = ({ communityId, users, isLoading }: CommunityMembersResultsProps) => {
  if (isLoading) {
    return <p className="community-requests__grid-message">Loading...</p>;
  }

  if (!users?.length) {
    return <p className="community-requests__grid-message">No Results</p>;
  }

  return (
    <div className="community-requests__grid">
      {users.map(user => (
        <RequestUserItem
          key={user._id}
          communityId={communityId}
          user={user}
        />
      ))}
    </div>
  )
}

const CommunityRequests = ({ community }: CommunityMembersProps) => {
  const { getRequestsByCommunityQuery } = useGetRequestsByCommunity(community._id);

  return (
    <CommunityMembersResults
      communityId={community._id}
      users={getRequestsByCommunityQuery.data?.response?.users}
      isLoading={getRequestsByCommunityQuery.isLoading}
    />
  )
}

export default CommunityRequests;