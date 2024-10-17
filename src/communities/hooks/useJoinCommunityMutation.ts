import { useMutation, useQueryClient } from "@tanstack/react-query"
import { joinCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";
import { POSTS_QUERY_KEYS } from "../../posts/lib/queryKeys";

const useJoinCommunityMutation = () => {

  const queryClient = useQueryClient();

  const joinCommunityMutation = useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.communityId],
      })
    }
  });

  return joinCommunityMutation;
}

export {
  useJoinCommunityMutation
};