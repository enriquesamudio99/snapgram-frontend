import { useMutation, useQueryClient } from "@tanstack/react-query"
import { POSTS_QUERY_KEYS } from "../../posts/lib/queryKeys";
import { followUser } from '../lib/actions';
import { USERS_QUERY_KEYS } from "../lib/queryKeys";

const useFollowUserMutation = () => {

  const queryClient = useQueryClient();

  const followUserMutation = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USER, data.response?.followingId]
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

  return followUserMutation;
}

export {
  useFollowUserMutation
};