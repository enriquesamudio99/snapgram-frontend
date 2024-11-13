import { useEffect, useState } from "react";
import { IAuthUser, ICommunity, IUser } from "../../types";
import { useFollowUserMutation, useUnfollowUserMutation } from "../hooks";
import { checkFollowing, checkIsFollowYou } from "../../helpers";
import { Link } from "react-router-dom";

interface TopCreatorItemProps {
  currentUser: IAuthUser;
  user: IUser;
  showFollowBtn?: boolean;
  isMemberItem?: boolean;
  community?: ICommunity | null;
}

const TopCreatorItem = ({ currentUser, user, showFollowBtn = true }: TopCreatorItemProps) => {

  // Mutations
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();

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

  return (
    <div className="top-creator-item">
      <div className="top-creator-item__container">
        <Link
          to={`/profile/${user._id}`}
          className="top-creator-item__info"
        >
          <img
            src={`${user.image?.secure_url ? user.image?.secure_url : "/assets/icons/profile-placeholder.svg"}`}
            alt={`${user.name} Profile`}
            className="top-creator-item__img"
          />
          <h2 className="top-creator-item__name">{user.name}</h2>
        </Link>
        {showFollowBtn && (
          <button
            type="button"
            className={`top-creator-item__btn ${checkFollowing(followers, currentUser.id) ? "top-creator-item__btn--unfollow" : ""}`}
            onClick={handleFollowUser}
          >
            {checkFollowing(followers, currentUser.id)
              ? "Unfollow"
              : `${checkIsFollowYou(following, currentUser.id)
                ? "Also Follow" : "Follow"}`
            }
          </button>
        )}
      </div>
    </div>
  )
}

export default TopCreatorItem