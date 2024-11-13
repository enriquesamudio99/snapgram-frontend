import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POSTS_QUERY_KEYS } from "../../posts/lib/queryKeys";
import { unfollowUser } from '../lib/actions';
import { USERS_QUERY_KEYS } from "../lib/queryKeys";

const useUnfollowUserMutation = () => {

  const queryClient = useQueryClient();

  const unfollowUserMutation = useMutation({
    mutationFn: (userId: string) => unfollowUser(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USER, data.response?.unfollowingId]
      })
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USERS]
      })
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USERS_BY_CREATED_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USER, data.response?.userId]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
    }
  });

  return unfollowUserMutation;
}

export {
  useUnfollowUserMutation
};