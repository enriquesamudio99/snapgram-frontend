import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { sharePost } from '../lib/actions';

const useSharePostMutation = () => {

  const queryClient = useQueryClient();

  const sharePostMutation = useMutation({
    mutationFn: (postId: string) => sharePost(postId),
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

  return sharePostMutation;
}

export {
  useSharePostMutation
};