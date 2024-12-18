import { formatDateString } from "../../helpers";
import { IPost } from "../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import PostStats from "./PostStats";
import { useAuth } from "../../common/hooks";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const PostCard = ({ post }: { post: IPost }) => {
  const isSharedPost = !!post.originalPost;
  const isCommunityPost = !!post.community;
  const postData = useMemo(() => isSharedPost ? post.originalPost : post, [post, isSharedPost]);

  const { user } = useAuth();

  return (
    <div className="post-card">
      <div className="post-card__container">
        {isSharedPost && (
          <p className="post-card__shared-by">Shared by: {post.author.name}</p>
        )}
        <div className="post-card__user">
          <Link to={`/profile/${postData.author._id}`}>
            <img
              src={`${postData.author.image?.secure_url ? postData.author.image?.secure_url : "/assets/icons/profile-placeholder.svg"}`}
              alt={`${postData.author.username} Profile`}
              className="post-card__user-img"
            />
          </Link>
          <div className="post-card__user-info">
            <Link to={`/profile/${postData.author._id}`}>
              <h2 className="post-card__user-info-name">{postData.author.name}</h2>
            </Link>
            <p className="post-card__user-info-date">
              {formatDateString(postData.createdAt.toString())} - {postData.location}
            </p>
            {isCommunityPost && (
              <Link to={`/community/${postData.community?._id}`}>
                <p className="post-card__user-info-community">
                  <img
                    src={`${post.community?.image?.secure_url ? post.community.image?.secure_url : "/assets/icons/profile-placeholder.svg"}`}
                    className="post-card__user-info-community-img"
                  />
                  <span>
                    {post.community?.name} Community
                  </span>
                </p>
              </Link>
            )}
          </div>
        </div>
        <Link to={`${isCommunityPost ? `/community/${postData.community?._id}/post/${postData._id}` : `/post/${postData._id}`}`}>
          <div className="post-card__content">
            <h3 className="post-card__caption">{postData.caption}</h3>
            {post.tags.length > 0 && (
              <ul className="post-card__tags">
                {postData.tags.map((tag: string) => (
                  <li key={tag} className="post-card__tag">
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Link>
        <div className="post-card__images">
          <Swiper
            slidesPerView="auto"
            grabCursor={true}
            className="post-card__swiper"
            pagination={{
              type: 'fraction',
            }}
            modules={[Pagination]}
          >
            {postData.images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="post-card__swiper-slide"
              >
                <img
                  src={image.secure_url}
                  alt="Image"
                  className="post-card__swiper-slide-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="post-card__stats">
          <PostStats
            post={postData}
            user={user}
            isCommunity={isCommunityPost}
          />
        </div>
      </div>
    </div>
  )
}

export default PostCard