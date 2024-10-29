import { Link, useNavigate, useParams } from "react-router-dom";
import { useFollowUserMutation, useUnfollowUserMutation, useGetUser } from "../hooks";
import { useEffect, useState } from "react";
import { useAuth } from "../../common/hooks";
import { checkFollowing, checkIsFollowYou } from "../../helpers";
import { useGetPostsByUser } from "../../posts/hooks";
import { IAuthUser, IPost } from "../../types";
import { PostItem } from "../../posts/components";

interface ProfilePostsProps {
  posts: IPost[] | undefined;
  isLoading: boolean;
  user: IAuthUser;
}

const ProfilePosts = ({ posts, isLoading, user }: ProfilePostsProps) => {

  if (isLoading) {
    return <p className="profile__grid-message">Loading...</p>;
  }

  if (!posts?.length) {
    return <p className="profile__grid-message">No Results</p>;
  }

  return (
    <div className="profile__grid">
      {posts.map(post => (
        <PostItem 
          key={post._id}
          post={post}
          user={user}
          showUser={false}
          showStats={false}
        />
      ))}
    </div>
  )
}

const Profile = () => {

  const navigate = useNavigate();
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();
  const { getUserQuery } = useGetUser(userId || "");
  const [totalPosts, setTotalPosts] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const user = getUserQuery.data?.response?.user;
  const { getPostsByUserQuery } = useGetPostsByUser(user?._id || null);

  useEffect(() => {
    if (user) {
      setTotalPosts(user.posts);
      setFollowers(user.followers);
      setFollowing(user.following);
    }
  }, [user]);

  if (getUserQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    navigate("/");
    return;
  }

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

  const posts = getPostsByUserQuery.data?.response?.posts;

  return (
    <section className="main-content__wrapper">
      <div className="profile">
        <div className="profile__container">
          <header className="profile__header">
            <div className="profile__img-container">
              <img
                src={`${user.image ? user.image.secure_url : "/assets/icons/profile-placeholder.svg"}`}
                alt="User Profile"
                className="profile__img"
              />
            </div>
            <div className="profile__details">
              <div className="profile__data">
                <div className="profile__info">
                  <h1 className="profile__name">{user.name}</h1>
                  <p className="profile__username">@{user.username}</p>
                </div>
                {user._id === currentUser.id ? (
                  <Link
                    to={`/update-profile/${user._id}`}
                    className="profile__edit-btn"
                  >
                    <img
                      src="/assets/icons/edit-post.svg"
                      alt="Edit Post Icon"
                      className="profile__edit-btn-icon"
                    />
                    Edit Profile
                  </Link>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    type="button"
                    className={`profile__follow-btn ${checkFollowing(followers, currentUser.id) ? "profile__follow-btn--warning" : ""}`}
                  >
                    {checkFollowing(followers, currentUser.id)
                      ? "Unfollow"
                      : `${checkIsFollowYou(following, currentUser.id)
                        ? "Also Follow" : "Follow"}`
                    }
                  </button>
                )}
              </div>
              <ul className="profile__stats">
                <li className="profile__stat">
                  <p className="profile__stat-text">
                    <span className="profile__stat-text-span">{totalPosts.length}</span>
                    {totalPosts.length === 1 ? "Post" : "Posts"}
                  </p>
                </li>
                <li className="profile__stat">
                  <p className="profile__stat-text">
                    <span className="profile__stat-text-span">{followers.length}</span>
                    {followers.length === 1 ? "Follower" : "Followers"}
                  </p>
                </li>
                <li className="profile__stat">
                  <p className="profile__stat-text">
                    <span className="profile__stat-text-span">{following.length}</span>
                    Following
                  </p>
                </li>
              </ul>
              <div className="profile__bio-container">
                <p className="profile__bio">{user.bio}</p>
              </div>
            </div>
          </header>
          <div className="profile__posts">
            <h2 className="profile__posts-title">Posts</h2>
            <ProfilePosts
              posts={posts}
              isLoading={getPostsByUserQuery.isLoading}
              user={currentUser}
            />
          </div>
      </div>
      </div>
    </section>
  )
}

export default Profile;