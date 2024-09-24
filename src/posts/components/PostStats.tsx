import { useEffect, useState } from "react"
import { IPost, IAuthUser, ISharedBy } from "../../types"
import { useGetCurrentUser } from "../../common/hooks";
import { checkIsLiked } from "../../helpers";
import { useLikePostMutation, useSavePostMutation, useUnlikePostMutation, useUnsavePostMutation } from "../hooks";

const PostStats = ({ post, user }: { post: IPost, user: IAuthUser }) => {

  const likePostMutation = useLikePostMutation();
  const unlikePostMutation = useUnlikePostMutation();
  const savePostMutation = useSavePostMutation();
  const unsavePostMutation = useUnsavePostMutation();

  const { getCurrentUserQuery } = useGetCurrentUser(user.id);

  const currentUser = getCurrentUserQuery.data?.response?.data.data;

  const savedPost = currentUser?.savedPosts?.find((p: string) => p === post._id);
  const sharedPost = post.sharedBy.find((sharedBy: ISharedBy) => sharedBy.user === user.id);

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);
  const [likes, setLikes] = useState<string[]>(post.likes);
  const [comments,] = useState<string[]>(post.comments);
  const [shared,] = useState<ISharedBy[]>(post.sharedBy);

  useEffect(() => {
    setIsSaved(!!savedPost);
    setIsShared(!!sharedPost);
  }, [currentUser, savedPost, sharedPost]);

  if (getCurrentUserQuery.isLoading) {
    return <p>Loading...</p>;
  }

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(user.id);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== user.id);
      await unlikePostMutation.mutateAsync(post._id);
      setLikes(newLikes);
      return;
    } 
    
    newLikes.push(user.id);
    await likePostMutation.mutateAsync(post._id);
    setLikes(newLikes);
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
          {post.author._id !== user.id && (
            <div className="post-card-stats__action">
              <img
                src={isShared ? "/assets/icons/shared.svg" : "/assets/icons/share.svg"}
                alt="Share Icon"
                onClick={handleLikePost}
                className="post-card-stats__action-img"
              />
              <p className="post-card-stats__action-text">{shared.length}</p>
            </div>
          )}
        </div>
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
            onClick={handleSavePost}
            className="post-card-stats__saved-img"
          />
        </button>
      </div>
    </div>
  )
}

export default PostStats;