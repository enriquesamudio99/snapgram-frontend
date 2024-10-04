import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/queryKeys";
import { updatePost } from '../lib/actions';

const useUpdatePostMutation = (postId: string) => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) => updatePost(postId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST, data.response?.post._id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      })
    }
  });

  return mutation;
}

export {
  useUpdatePostMutation
};