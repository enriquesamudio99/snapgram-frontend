import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { unsharePost } from '../lib/actions';
import { useAuth } from "../../common/hooks";
import { USERS_QUERY_KEYS } from "../../users/lib/queryKeys";

const useUnsharePostMutation = () => {

  const queryClient = useQueryClient();
  const { user } = useAuth();

  const unsharePostMutation = useMutation({
    mutationFn: (postId: string) => unsharePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POST, data?.response?.post._id]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS_BY_USER, data?.response?.post.author]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_RELATED_POSTS_BY_USER, data?.response?.post.author]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS_BY_USER, user.id]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_RELATED_POSTS_BY_USER, user.id]
      })
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USER, user.id]
      })
    }
  });

  return unsharePostMutation;
}

export {
  useUnsharePostMutation
};