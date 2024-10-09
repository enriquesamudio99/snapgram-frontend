import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { COMMON_QUERY_KEYS } from "../../common/lib/queryKeys";
import { unsavePost } from '../lib/actions';

const useUnsavePostMutation = () => {

  const queryClient = useQueryClient();

  const unsavePostMutation = useMutation({
    mutationFn: (postId: string) => unsavePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [COMMON_QUERY_KEYS.GET_CURRENT_USER]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_SAVED_POSTS]
      })
    }
  });

  return unsavePostMutation;
}

export {
  useUnsavePostMutation
};