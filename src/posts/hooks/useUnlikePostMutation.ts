import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { unlikePost } from '../lib/actions';

const useUnlikePostMutation = () => {

  const queryClient = useQueryClient();

  const unlikePostMutation = useMutation({
    mutationFn: (postId: string) => unlikePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POST, data.response?.post._id]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS_BY_USER, data?.response?.post.author]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_RELATED_POSTS_BY_USER, data?.response?.post.author]
      })
    }
  });

  return unlikePostMutation;
}

export {
  useUnlikePostMutation
};