import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { createPost } from '../lib/actions';
import { USERS_QUERY_KEYS } from "../../users/lib/queryKeys";

const usePostMutation = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) => createPost(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS_BY_USER, data.response?.post.author]
      })
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USER, data.response?.post.author]
      })
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