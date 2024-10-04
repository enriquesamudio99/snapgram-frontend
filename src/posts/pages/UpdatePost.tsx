import { useNavigate, useParams } from "react-router-dom";
import { UpdatePostForm } from "../components";
import { useAuth } from "../../common/hooks";
import { useGetPost } from "../hooks";


const UpdatePost = () => {

  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useAuth();

  const { getPostQuery } = useGetPost(postId || "");
  
  const post = getPostQuery.data?.response?.post;

  if (getPostQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!post || post.author._id !== user.id) {
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
              Update a Post
            </h2>
            <UpdatePostForm
              post={post}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default UpdatePost;