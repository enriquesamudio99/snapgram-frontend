import { formatDateString } from "../../helpers";
import { IPost } from "../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import PostStats from "./PostStats";
import { useAuth } from "../../common/hooks";

const PostCard = ({ post }: { post: IPost }) => {  

  const isSharedPost = !!post.originalPost;
  const postData = isSharedPost ? post.originalPost : post;
  
  const { user } = useAuth();

  return (
    <div className="post-card">
      <div className="post-card__container">
        {isSharedPost && (
          <p className="post-card__shared-by">Shared by: {post.author.name}</p>
        )}
        <div className="post-card__user">
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt={`${postData.author.username} Profile`}
            className="post-card__user-img"
          />
          <div className="post-card__user-info">
            <h2 className="post-card__user-info-name">{postData.author.name}</h2>
            <p className="post-card__user-info-date">
              {formatDateString(postData.createdAt.toString())} - {postData.location}  
            </p>
          </div>
        </div>
        <div className="post-card__content">
          <h3 className="post-card__caption">{postData.caption}</h3>
          <ul className="post-card__tags">
            {postData.tags.map((tag: string) => (
              <li key={tag} className="post-card__tag">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
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
            post={isSharedPost ? post.originalPost : post}
            user={user}
          />
        </div>
      </div>
    </div>
  )
}

export default PostCard