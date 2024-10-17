import { checkMemberRequest, checkMembership } from "../../helpers";
import { IAuthUser, ICommunity } from "../../types";
import { useJoinCommunityMutation, useLeaveCommunityMutation, useRequestCommunityMutation, useDeleteRequestCommunityMutation } from "../hooks";

interface CommunityActionsProps {
  community: ICommunity;
  members: string[];
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
  membersRequests: string[];
  setMembersRequests: React.Dispatch<React.SetStateAction<string[]>>;
  user: IAuthUser;
}

interface CommunityPrivateActionsProps {
  communityId: string;
  membersRequests: string[];
  setMembersRequests: React.Dispatch<React.SetStateAction<string[]>>;
  user: IAuthUser;
}

interface CommunityPublicActionsProps {
  communityId: string;
  members: string[];
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
  user: IAuthUser;
}

const CommunityPrivateActions = ({ communityId, membersRequests, setMembersRequests, user } : CommunityPrivateActionsProps) => {

  const requestCommunityMutation = useRequestCommunityMutation();
  const deleteRequestCommunityMutation = useDeleteRequestCommunityMutation();

  const handleRequestMembership = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newMembersRequests = [...membersRequests];

    const hasRequest = newMembersRequests.includes(user.id);

    if (hasRequest) {
      newMembersRequests = newMembersRequests.filter((id) => id !== user.id);
      setMembersRequests(newMembersRequests);
      await deleteRequestCommunityMutation.mutateAsync(communityId);
      return;
    }

    newMembersRequests.push(user.id);
    setMembersRequests(newMembersRequests);
    await requestCommunityMutation.mutateAsync(communityId);
  }

  return (
    <button
      onClick={handleRequestMembership}
      type="button"
      className={`${checkMemberRequest(membersRequests, user.id) ? "community-actions__delete-request-btn" : "community-actions__request-btn"}`}
    >
      {checkMemberRequest(membersRequests, user.id) ? "Delete Request Membership" : "Request Membership"}
    </button>
  )
}

const CommunityPublicActions = ({ communityId, members, setMembers, user } : CommunityPublicActionsProps) => {

  const joinCommunityMutation = useJoinCommunityMutation();

  const handleJoinGroup = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newMembers = [...members];
    newMembers.push(user.id);

    setMembers(newMembers);
    await joinCommunityMutation.mutateAsync(communityId);
  }

  return (
    <button
      onClick={handleJoinGroup}
      type="button"
      className="community-actions__join-btn"
    >
      Join Community
    </button>
  )
}

const CommunityActions = ({ community, members, setMembers, membersRequests, setMembersRequests, user }: CommunityActionsProps) => {

  const leaveCommunityMutation = useLeaveCommunityMutation();

  const handleLeaveGroup = async (e: React.MouseEvent) => {
    e.preventDefault();

    let newMembers = [...members];
    newMembers = newMembers.filter((id) => id !== user.id);

    setMembers(newMembers);
    await leaveCommunityMutation.mutateAsync(community._id);
  }

  return (
    <>
      {!checkMembership(members, user.id) ? (
        community.communityType === "Private" ? (
          <CommunityPrivateActions 
            communityId={community._id}
            membersRequests={membersRequests}
            setMembersRequests={setMembersRequests}
            user={user}
          />
        ) : (
          <CommunityPublicActions
            communityId={community._id}
            members={members}
            setMembers={setMembers}
            user={user}
          />
        )
      ) : (
        <button
          type="button"
          onClick={handleLeaveGroup}
          className="community-actions__leave-btn"
        >
          Leave Community
        </button>
      )}
    </>
  )
}

export default CommunityActions