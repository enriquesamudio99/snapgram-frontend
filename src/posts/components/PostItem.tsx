import { Link } from 'react-router-dom';
import { IAuthUser, IPost } from '../../types'
import { PostStats } from './';
import { useMemo } from 'react';

interface PostItemProps {
  post: IPost;
  user: IAuthUser;
  showUser?: boolean;
  showStats?: boolean;
}

const PostItem = ({ post, user, showUser = true, showStats = true }: PostItemProps) => {

  const isSharedPost = !!post.originalPost;
  const postData = useMemo(() => isSharedPost ? post.originalPost : post, [post, isSharedPost]);

  return (
    <div className="post-item">
      <div className="post-item__container">
        <Link to={`/post/${postData._id}`}>
          <img
            src={postData.images[0].secure_url}
            alt="First Post Image"
            className="post-item__img"
          />
        </Link>
        {isSharedPost && (
          <img 
            src="/assets/icons/white-shared.svg"
            alt="Share Icon"
            className="post-item__is-shared"
          />
        )}
        {post.images.length > 1 && (
          <img 
            src="/assets/icons/carousel.svg"
            alt="Carousel Icon"
            className="post-item__carousel"
          />
        )}
        <div className="post-item__info">
          {showUser && (
            <Link to={`/profile/${postData.author._id}`}>
              <div className="post-item__user">
                <img
                  src="/assets/icons/profile-placeholder.svg"
                  alt="User Profile"
                  className="post-item__user-img"
                />
                <p className="post-item__user-username">@{postData.author.username}</p>
              </div>
            </Link>
          )}
          {showStats && (
            <PostStats
              post={post}
              user={user}
              isPostItem={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PostItem;