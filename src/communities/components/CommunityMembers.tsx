import { checkMembership } from "../../helpers";
import { IAuthUser, ICommunity, IUser } from "../../types";
import { UserItem } from "../../users/components";
import { useGetMembersByCommunity } from "../hooks";

interface CommunityMembersProps {
  community: ICommunity;
  currentUser: IAuthUser;
}

interface CommunityMembersResultsProps {
  users: IUser[] | undefined;
  isLoading: boolean;
  user: IAuthUser;
  community: ICommunity;
}

const CommunityMembersResults = ({ users, isLoading, user:currentUser, community } : CommunityMembersResultsProps) => {
  if (isLoading) {
    return <p className="community-members__grid-message">Loading...</p>;
  }

  if (!users?.length) {
    return <p className="community-members__grid-message">No Results</p>;
  }

  return (
    <div className="community-members__grid">
      {users.map(user => (
        <UserItem 
          key={user._id}
          user={user}
          currentUser={currentUser}
          showFollowBtn={false}
          isMemberItem={true}
          community={community}
        />
      ))}
    </div>
  )
}

const CommunityMembers = ({ community, currentUser } : CommunityMembersProps) => {
  const { getMembersByCommunityQuery } = useGetMembersByCommunity(community._id);
  
  if (community.communityType === "Private" && !checkMembership(community.members, currentUser.id)) {
    return <p className="community-members__message">This is a private community. Join to see the members</p>;
  }

  return (
    <CommunityMembersResults 
      users={getMembersByCommunityQuery.data?.response?.users}
      isLoading={getMembersByCommunityQuery.isLoading}
      user={currentUser}
      community={community}
    />
  )
}

export default CommunityMembers