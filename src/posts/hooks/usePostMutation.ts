import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { createPost } from '../lib/actions';

const usePostMutation = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS],
      })
    }
  });

  return mutation;
}

export {
  usePostMutation
};