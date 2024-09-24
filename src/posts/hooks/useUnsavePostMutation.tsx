import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { unsavePost } from '../lib/actions';

const useUnsavePostMutation = () => {

  const queryClient = useQueryClient();

  const unsavePostMutation = useMutation({
    mutationFn: (postId: string) => unsavePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  });

  return unsavePostMutation;
}

export {
  useUnsavePostMutation
};