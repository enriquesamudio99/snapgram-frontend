import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { COMMON_QUERY_KEYS } from "../../common/lib/queryKeys";
import { savePost } from '../lib/actions';

const useSavePostMutation = () => {

  const queryClient = useQueryClient();

  const savePostMutation = useMutation({
    mutationFn: (postId: string) => savePost(postId),
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

  return savePostMutation;
}

export {
  useSavePostMutation
};