import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { likePost } from '../lib/actions';

const useLikePostMutation = () => {

  const queryClient = useQueryClient();

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST, data?.response?.post._id]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS_BY_USER, data?.response?.post.author]
      })
    }
  });

  return likePostMutation;
}

export {
  useLikePostMutation
};