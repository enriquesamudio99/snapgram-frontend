import { useNavigate, useParams } from "react-router-dom";
import { UpdatePostForm } from "../../posts/components";
import { useAuth } from "../../common/hooks";
import { useGetPost } from "../../posts/hooks";
import { useGetCommunity } from "../hooks";


const UpdateCommunityPost = () => {

  const navigate = useNavigate();
  const { communityId, postId } = useParams();
  const { user } = useAuth();

  const { getPostQuery } = useGetPost(postId || "");
  const { getCommunityQuery } = useGetCommunity(communityId || null);
  
  const post = getPostQuery.data?.response?.post;
  const community = getCommunityQuery.data?.response?.community;

  if (getPostQuery.isLoading || getCommunityQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!post || post.author._id !== user.id || !community || !community.members.includes(user.id)) {
    navigate("/");
    return null;
  }

  return (
    <>
      <section className="main-content__wrapper">
        <div className="create-post">
          <div className="create-post__container">
            <h2 className="create-post__title">
              <img
                src="/assets/icons/add-post.svg" 
                alt="Add Post Icon" 
                className="create-post__title-img" 
              />
              Update a Community Post
            </h2>
            <UpdatePostForm
              communityId={community._id}
              post={post}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default UpdateCommunityPost;