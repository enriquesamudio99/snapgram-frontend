import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCommunityPost } from '../lib/actions';
import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { COMMUNITIES_QUERY_KEYS } from "../../communities/lib/queryKeys";

const useCommunityPostMutation = (communityId: string | null) => {

  const queryClient = useQueryClient();

  const communityPostMutation = useMutation({
    mutationFn: (data: FormData) => createCommunityPost(data, communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, communityId],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_POSTS_BY_COMMUNITY, communityId],
      })
    }
  });

  return communityPostMutation;
}

export {
  useCommunityPostMutation
};