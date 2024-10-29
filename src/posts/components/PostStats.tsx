import { useEffect, useState } from "react"
import { IPost, IAuthUser, ISharedBy } from "../../types"
import { useGetCurrentUser } from "../../common/hooks";
import { checkIsLiked, checkIsShared } from "../../helpers";
import { useLikePostMutation, useSavePostMutation, useSharePostMutation, useUnlikePostMutation, useUnsavePostMutation, useUnsharePostMutation } from "../hooks";

interface PostsStatsProps {
  post: IPost;
  user: IAuthUser;
  isPostItem?: boolean;
  isCommunity?: boolean;
}

const PostStats = ({ post, user, isPostItem = false, isCommunity = false }: PostsStatsProps) => {
  // Mutations
  const likePostMutation = useLikePostMutation();
  const unlikePostMutation = useUnlikePostMutation();
  const savePostMutation = useSavePostMutation();
  const unsavePostMutation = useUnsavePostMutation();
  const sharePostMutation = useSharePostMutation();
  const unsharePostMutation = useUnsharePostMutation();

  // Current User
  const { getCurrentUserQuery } = useGetCurrentUser();
  const currentUser = getCurrentUserQuery.data?.response?.user;

  const savedPost = currentUser?.savedPosts?.find((p: string) => p === post._id);

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [likes, setLikes] = useState<string[]>([]);
  const [comments,] = useState<string[]>(post.comments);
  const [shared, setShared] = useState<string[]>([]);

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
      const sharedByList = post.sharedBy.map((shared: ISharedBy) => shared.user);
      setShared(sharedByList);
      setIsSaved(!!savedPost);
    }
  }, [post, currentUser, savedPost]);

  if (getCurrentUserQuery.isLoading) {
    return <p>Loading...</p>;
  }

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(user.id);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== user.id);
      setLikes(newLikes);
      await unlikePostMutation.mutateAsync(post._id);
      return;
    }

    newLikes.push(user.id);
    setLikes(newLikes);
    await likePostMutation.mutateAsync(post._id);
  }

  const handleSavePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPost) {
      setIsSaved(false);
      await unsavePostMutation.mutateAsync(post._id);
      return;
    }

    setIsSaved(true);
    await savePostMutation.mutateAsync(post._id);
  }

  const handleSharePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newShared = [...shared];

    const hasShared = newShared.includes(user.id);

    if (hasShared) {
      newShared = newShared.filter((id) => id !== user.id);
      setShared(newShared);
      await unsharePostMutation.mutateAsync(post._id);
      return;
    }

    newShared.push(user.id);    
    setShared(newShared);
    await sharePostMutation.mutateAsync(post._id);
  };

  return (
    <div className="post-card-stats">
      <div className="post-card-stats__container">
        <div className="post-card-stats__actions">
          <button
            type="button"
            className={`
              post-card-stats__action 
              ${likePostMutation.isPending || unlikePostMutation.isPending
                ? "post-card-stats__action--disabled"
                : ""
              }  
            `}
            onClick={handleLikePost}
            disabled={likePostMutation.isPending || unlikePostMutation.isPending}
          >
            <img
              src={checkIsLiked(likes, user.id) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
              alt="Like Icon"
              className="post-card-stats__action-img"
            />
            <p className="post-card-stats__action-text">{likes.length}</p>
          </button>
          <div className="post-card-stats__action">
            <img
              src="/assets/icons/comment.svg"
              alt="Comment Icon"
              className="post-card-stats__action-img"
            />
            <p className="post-card-stats__action-text">{comments.length}</p>
          </div>
          {post.author._id !== user.id && !isPostItem && !isCommunity && (
            <button 
              type="button" 
              className={`
                post-card-stats__action 
                ${sharePostMutation.isPending || unsharePostMutation.isPending
                  ? "post-card-stats__action--disabled"
                  : ""
                }  
              `}
              onClick={handleSharePost}
              disabled={sharePostMutation.isPending || unsharePostMutation.isPending}
            >
              <img
                src={checkIsShared(shared, user.id) ? "/assets/icons/shared.svg" : "/assets/icons/share.svg"}
                alt="Share Icon"
                className="post-card-stats__action-img"
              />
              <p className="post-card-stats__action-text">{shared.length}</p>
            </button>
          )}
        </div>
        {post.author._id !== user.id && !isPostItem && !isCommunity &&  (
          <button
            type="button"
            className={`
            post-card-stats__saved 
            ${savePostMutation.isPending || unsavePostMutation.isPending
                ? "post-card-stats__saved--disabled"
                : ""
              }  
          `}
            onClick={handleSavePost}
            disabled={savePostMutation.isPending || unsavePostMutation.isPending}
          >
            <img
              src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
              alt="Save Icon"
              className="post-card-stats__saved-img"
            />
          </button>
        )}
      </div>
    </div>
  )
};

export default PostStats;