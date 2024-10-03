import { Link } from 'react-router-dom';
import { IAuthUser, IPost } from '../../types'
import { PostStats } from './';

interface PostItemProps {
  post: IPost;
  user: IAuthUser;
  showUser?: boolean;
  showStats?: boolean;
}

const PostItem = ({ post, user, showUser = true, showStats = true }: PostItemProps) => {
  return (
    <div className="post-item">
      <div className="post-item__container">
        <Link to={`/post/${post._id}`}>
          <img
            src={post.images[0].secure_url}
            alt="First Post Image"
            className="post-item__img"
          />
        </Link>
        <div className="post-item__info">
          {showUser && (
            <div className="post-item__user">
              <img
                src="/assets/icons/profile-placeholder.svg"
                alt="User Profile"
                className="post-item__user-img"
              />
              <p className="post-item__user-username">@{post.author.username}</p>
            </div>
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