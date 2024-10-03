import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { unsharePost } from '../lib/actions';

const useUnsharePostMutation = () => {

  const queryClient = useQueryClient();

  const unsharePostMutation = useMutation({
    mutationFn: (postId: string) => unsharePost(postId),
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

  return unsharePostMutation;
}

export {
  useUnsharePostMutation
};