import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { sharePost } from '../lib/actions';

const useSharePostMutation = () => {

  const queryClient = useQueryClient();

  const sharePostMutation = useMutation({
    mutationFn: (postId: string) => sharePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  });

  return sharePostMutation;
}

export {
  useSharePostMutation
};