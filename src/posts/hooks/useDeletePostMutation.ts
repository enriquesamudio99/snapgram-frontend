import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/queryKeys";
import { deletePost } from '../lib/actions';

const useDeletePostMutation = () => {

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
    }
  });

  return deletePostMutation;
}

export {
  useDeletePostMutation
};