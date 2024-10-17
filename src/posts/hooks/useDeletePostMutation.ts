import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { deletePost } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../../communities/lib/queryKeys";
import { USERS_QUERY_KEYS } from "../../users/lib/queryKeys";

const useDeletePostMutation = () => {

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS_BY_USER, data.response?.post.author._id]
      })
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USER, data.response?.post.author._id]
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.post.community]
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_POSTS_BY_COMMUNITY, data.response?.post.community]
      })
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS]
      })
    }
  });

  return deletePostMutation;
}

export {
  useDeletePostMutation
};