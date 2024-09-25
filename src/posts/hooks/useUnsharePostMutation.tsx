import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { unsharePost } from '../lib/actions';

const useUnsharePostMutation = () => {

  const queryClient = useQueryClient();

  const unsharePostMutation = useMutation({
    mutationFn: (postId: string) => unsharePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  });

  return unsharePostMutation;
}

export {
  useUnsharePostMutation
};