import { useNavigate, useParams } from "react-router-dom";
import { useGetCommunity } from "../hooks";
import { useEffect, useState } from "react";
import { useAuth } from "../../common/hooks";
import { CommunityActions, CommunityTabs } from "../components";

const Community = () => {

  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const { communityId } = useParams();
  const { getCommunityQuery } = useGetCommunity(communityId || null);
  const [totalPosts, setTotalPosts] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [membersRequests, setMembersRequests] = useState<string[]>([]);

  const community = getCommunityQuery.data?.response?.community;

  useEffect(() => {
    if (community) {
      setTotalPosts(community.posts);
      setMembers(community.members);
      setMembersRequests(community.membersRequests);
    }
  }, [community]);

  if (getCommunityQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!community) {
    navigate("/");
    return;
  }

  return (
    <section className="main-content__wrapper">
      <div className="community">
        <div className="community__container">
          <header className="community__header">
            <div className="community__img-container">
              <img
                src={`${community.image?.secure_url ? community.image?.secure_url : "/assets/icons/profile-placeholder.svg"}`}
                alt="Community Profile"
                className="community__img"
              />
            </div>
            <div className="community__details">
              <div className="community__data">
                <div className="community__info">
                  <h1 className="community__name">{community.name}</h1>
                  <p className="community__username">@{community.username}</p>
                  <p className="community__username">{community.communityType} Community</p>
                </div>
                {community.createdBy === currentUser.id ? (
                  <button
                    type="button"
                    className="community__edit-btn"
                  >
                    <img
                      src="/assets/icons/edit-post.svg"
                      alt="Edit Post Icon"
                      className="community__edit-btn-icon"
                    />
                    Edit Community
                  </button>
                ) : (
                  <CommunityActions
                    community={community}
                    members={members}
                    setMembers={setMembers}
                    membersRequests={membersRequests}
                    setMembersRequests={setMembersRequests}
                    user={currentUser}
                  />
                )}
              </div>
              <ul className="community__stats">
                <li className="community__stat">
                  <p className="community__stat-text">
                    <span className="community__stat-text-span">{totalPosts.length}</span>
                    {totalPosts.length === 1 ? "Post" : "Posts"}
                  </p>
                </li>
                <li className="community__stat">
                  <p className="community__stat-text">
                    <span className="community__stat-text-span">{members.length}</span>
                    {members.length === 1 ? "Member" : "Members"}
                  </p>
                </li>
              </ul>
              <div className="community__bio-container">
                <p className="community__bio">{community.bio}</p>
              </div>
            </div>
          </header>
          <div className="community__content">
            <CommunityTabs
              community={community}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community;