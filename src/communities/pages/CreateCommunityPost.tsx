import { useNavigate, useParams } from "react-router-dom";
import { CreatePostForm } from "../../posts/components";
import { useAuth } from "../../common/hooks";
import { useGetCommunity } from "../hooks";

const CreateCommunityPost = () => {

  const navigate = useNavigate();
  const { communityId } = useParams();
  const { user: currentUser } = useAuth();
  const { getCommunityQuery } = useGetCommunity(communityId || null);

  const community = getCommunityQuery.data?.response?.community;

  if (getCommunityQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!community || !community.members.includes(currentUser.id)) {
    navigate("/");
    return;
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
              Create a Community Post
            </h2>
            <CreatePostForm 
              communityId={communityId}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default CreateCommunityPost;