import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../common/hooks";
import { useDeletePostMutation, useGetPost, useGetRelatedPostsByUser } from "../hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { formatDateString } from "../../helpers";
import { PostItem, PostStats } from "../components";
import { toast } from "react-toastify";

const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useAuth();

  const { getPostQuery } = useGetPost(postId || "");
  const deletePostMutation = useDeletePostMutation();

  const post = getPostQuery.data?.response?.post;
  const { getRelatedPostsByUserQuery } = useGetRelatedPostsByUser(post?.author?._id || "", true);

  if (getPostQuery.isLoading || getRelatedPostsByUserQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    navigate("/");
    return null;
  }

  const handleDeletePost = async () => {
    const { response, error } = await deletePostMutation.mutateAsync(post._id);

    if (response) {
      navigate(-1);
    }

    if (error) {
      toast.error(error.message);
    }
  }

  const userPosts = getRelatedPostsByUserQuery.data?.response?.posts;
  const relatedPosts = userPosts?.filter(post => post._id !== postId);

  return (
    <section className="main-content__wrapper">
      <div className="post">
        <div className="post__container">
          <div className="post__card">
            <div className="post__card-images">
              <Swiper
                slidesPerView="auto"
                grabCursor={true}
                className="post__card-swiper"
                modules={[Pagination]}
              >
                {post.images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="post__card-swiper-slide"
                  >
                    <img
                      src={image.secure_url}
                      alt="Image"
                      className="post__card-swiper-slide-img"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="post__card-info">
              <div className="post__card-header">
                <Link to={`/profile/${post.author._id}`}>
                  <div className="post__card-user">
                    <img
                      src={`${post.author.image?.secure_url ? post.author.image?.secure_url : "/assets/icons/profile-placeholder.svg"}`}
                      alt={`${post.author.username} Profile`}
                      className="post__card-user-img"
                    />
                    <div className="post__card-user-info">
                      <h2 className="post__card-user-info-name">{post.author.name}</h2>
                      <p className="post__card-user-info-date">
                        {formatDateString(post.createdAt.toString())} - {post.location}
                      </p>
                    </div>
                  </div>
                </Link>
                {post.author._id === user.id && (
                  <div className="post__card-actions">
                    <Link
                      to={`/update-post/${post._id}`}
                      className="post__card-actions-edit"
                    >
                      <img
                        src="/assets/icons/edit-post.svg"
                        alt="Edit Post Icon"
                        className="post__card-actions-edit-img"
                      />
                    </Link>
                    <button
                      type="button"
                      className="post__card-actions-delete"
                      onClick={handleDeletePost}
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt="Delete Post Icon"
                        className="post__card-actions-delete-img"
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="post__card-content">
                <h3 className="post__card-caption">{post.caption}</h3>
                <ul className="post__card-tags">
                  {post.tags.map((tag: string) => (
                    <li key={tag} className="post__card-tag">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="post__card-comments">

              </div>
              <div className="post__card-stats">
                <PostStats
                  post={post}
                  user={user}
                />
              </div>
            </div>
          </div>
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="post__related">
              <h2 className="post__related-title">More Related Posts</h2>
              <div className="post__related-grid">
                {relatedPosts.map(post => (
                  <PostItem
                    key={post._id}
                    post={post}
                    user={user}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Post;