import { Link } from "react-router-dom";
import { checkMembership } from "../../helpers";
import { PostItem } from "../../posts/components";
import { IAuthUser, ICommunity, IPost } from "../../types"
import { useGetPostsByCommunity } from "../hooks";

interface CommunityPostsProps {
  community: ICommunity;
  currentUser: IAuthUser;
}

interface CommunityPostsResultsProps {
  posts: IPost[] | undefined;
  isLoading: boolean;
  user: IAuthUser;
}

const CommunityPostsResults = ({ posts, isLoading, user }: CommunityPostsResultsProps) => {
  if (isLoading) {
    return <p className="community-posts__grid-message">Loading...</p>;
  }

  if (!posts?.length) {
    return <p className="community-posts__grid-message">No Results</p>;
  }

  return (
    <div className="community-posts__grid">
      {posts.map(post => (
        <PostItem
          key={post._id}
          post={post}
          user={user}
          showUser={false}
          showStats={false}
          isCommunity={true}
        />
      ))}
    </div>
  )
}

const CommunityPosts = ({ community, currentUser }: CommunityPostsProps) => {

  const { getPostsByCommunityQuery } = useGetPostsByCommunity(community._id);

  if (community.communityType === "Private" && !checkMembership(community.members, currentUser.id)) {
    return <p className="community-posts__message">This is a private community. Join to see the posts</p>;
  }

  return (
    <>
      {checkMembership(community.members, currentUser.id) && (
        <Link
          to={`/community/${community._id}/create-post`}
          className="community-posts__create-btn"
        >
          Create Post
        </Link>
      )}
      <CommunityPostsResults
        posts={getPostsByCommunityQuery.data?.response?.posts}
        isLoading={getPostsByCommunityQuery.isLoading}
        user={currentUser}
      />
    </>
  )
}

export default CommunityPosts