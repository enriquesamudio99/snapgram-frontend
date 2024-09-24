import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { unlikePost } from '../lib/actions';

const useUnlikePostMutation = () => {

  const queryClient = useQueryClient();

  const unlikePostMutation = useMutation({
    mutationFn: (postId: string) => unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  });

  return unlikePostMutation;
}

export {
  useUnlikePostMutation
};