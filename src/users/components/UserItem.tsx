import { useEffect, useState } from "react";
import { IAuthUser, ICommunity, IUser } from "../../types";
import { useFollowUserMutation, useUnfollowUserMutation } from "../hooks";
import { checkFollowing, checkIsFollowYou } from "../../helpers";
import { Link } from "react-router-dom";
import { useDeleteMemberMutation } from "../../communities/hooks";

interface UserItemProps {
  currentUser: IAuthUser;
  user: IUser;
  showFollowBtn?: boolean;
  isMemberItem?: boolean;
  community?: ICommunity | null;
}

const UserItem = ({ currentUser, user, showFollowBtn = true, isMemberItem = false, community = null }: UserItemProps) => {

  // Mutations
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();
  const deleteMemberMutation = useDeleteMemberMutation();

  // States
  const [followers, setFollowers] = useState<string[]>(user.followers);
  const [following, setFollowing] = useState<string[]>(user.following);

  useEffect(() => {
    if (user) {
      setFollowers(user.followers);
      setFollowing(user.following);
    }
  }, [user]);

  const handleFollowUser = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newFollowers = [...followers];

    const hasFollow = newFollowers.includes(currentUser.id);

    if (hasFollow) {
      newFollowers = newFollowers.filter((id) => id !== currentUser.id);
      setFollowers(newFollowers);
      await unfollowUserMutation.mutateAsync(user._id);
      return;
    }

    newFollowers.push(currentUser.id);
    setFollowers(newFollowers);
    await followUserMutation.mutateAsync(user._id);
  }

  const handleDeleteMember = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await deleteMemberMutation.mutateAsync({ communityId: community?._id, memberId: user._id });
  }

  return (
    <div className="user-item">
      <div className="user-item__container">
        <Link
          to={`/profile/${user._id}`}
          className="user-item__info"
        >
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt={`${user.name} Profile`}
            className="user-item__img"
          />
          <h2 className="user-item__name">{user.name}</h2>
          <p className="user-item__username">@{user.username}</p>
        </Link>
        {showFollowBtn && (
          <button
            type="button"
            className={`user-item__btn ${checkFollowing(followers, currentUser.id) ? "user-item__btn--unfollow" : ""}`}
            onClick={handleFollowUser}
          >
            {checkFollowing(followers, currentUser.id)
              ? "Unfollow"
              : `${checkIsFollowYou(following, currentUser.id)
                ? "Also Follow" : "Follow"}`
            }
          </button>
        )}
        {isMemberItem && community?.createdBy === currentUser.id && user._id !== currentUser.id && (
          <button
            type="button"
            className="user-item__delete-member-btn"
            onClick={handleDeleteMember}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default UserItem