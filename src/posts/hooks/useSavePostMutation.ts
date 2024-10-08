import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { savePost } from '../lib/actions';

const useSavePostMutation = () => {

  const queryClient = useQueryClient();

  const savePostMutation = useMutation({
    mutationFn: (postId: string) => savePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS]
      })
    }
  });

  return savePostMutation;
}

export {
  useSavePostMutation
};