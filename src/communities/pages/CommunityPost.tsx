import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../common/hooks";
import { useDeletePostMutation, useGetPost } from "../../posts/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { checkMembership, formatDateString } from "../../helpers";
import { toast } from "react-toastify";
import { PostStats } from "../../posts/components";
import { useGetCommunity } from "../hooks";

const CommunityPost = () => {
  const navigate = useNavigate();
  const { communityId, postId } = useParams();
  const { user } = useAuth();
  const deletePostMutation = useDeletePostMutation();

  const { getPostQuery } = useGetPost(postId || "");
  const { getCommunityQuery } = useGetCommunity(communityId || null);


  const post = getPostQuery.data?.response?.post;
  const community = getCommunityQuery.data?.response?.community;

  if (getPostQuery.isLoading || getCommunityQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!post || !community) {
    navigate("/");
    return null;
  }

  if (community.communityType === "Private" && !checkMembership(community.members, user.id)) {
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

  return (
    <section className="main-content__wrapper">
      <div className="community-post">
        <div className="community-post__container">
          <div className="community-post__card">
            <div className="community-post__card-images">
              <Swiper
                slidesPerView="auto"
                grabCursor={true}
                className="community-post__card-swiper"
                modules={[Pagination]}
              >
                {post.images.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="community-post__card-swiper-slide"
                  >
                    <img
                      src={image.secure_url}
                      alt="Image"
                      className="community-post__card-swiper-slide-img"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="community-post__card-info">
              <div className="community-post__card-header">
                <div className="community-post__card-user">
                  <Link to={`/profile/${post.author._id}`}>
                    <img
                      src={`${post.author.image?.secure_url ? post.author.image?.secure_url : "/assets/icons/profile-placeholder.svg"}`}
                      alt={`${post.author.username} Profile`}
                      className="community-post__card-user-img"
                    />
                  </Link>
                  <div className="community-post__card-user-info">
                    <Link to={`/profile/${post.author._id}`}>
                      <h2 className="community-post__card-user-info-name">{post.author.name}</h2>
                    </Link>
                    <p className="community-post__card-user-info-date">
                      {formatDateString(post.createdAt.toString())} - {post.location}
                    </p>
                    <Link to={`/community/${post.community?._id}`}>
                      <p className="community-post__card-user-info-community">
                        <img
                          src={`${post.community?.image?.secure_url ? post.community.image?.secure_url : "/assets/icons/profile-placeholder.svg"}`}
                          className="community-post__card-user-info-community-img"
                        />
                        <span>
                          {post.community?.name} Community
                        </span>
                      </p>
                    </Link>
                  </div>
                </div>
                {post.author._id === user.id && (
                  <div className="community-post__card-actions">
                    <Link
                      to={`/community/${post.community?._id}/update-post/${post._id}`}
                      className="community-post__card-actions-edit"
                    >
                      <img
                        src="/assets/icons/edit-post.svg"
                        alt="Edit Post Icon"
                        className="community-post__card-actions-edit-img"
                      />
                    </Link>
                    <button
                      type="button"
                      className="community-post__card-actions-delete"
                      onClick={handleDeletePost}
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt="Delete Post Icon"
                        className="community-post__card-actions-delete-img"
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="community-post__card-content">
                <h3 className="community-post__card-caption">{post.caption}</h3>
                <ul className="community-post__card-tags">
                  {post.tags.map((tag: string) => (
                    <li key={tag} className="community-post__card-tag">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="community-post__card-comments">

              </div>
              <div className="community-post__card-stats">
                <PostStats
                  post={post}
                  user={user}
                  isCommunity={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityPost;