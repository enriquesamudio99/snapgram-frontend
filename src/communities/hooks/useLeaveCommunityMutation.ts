import { useMutation, useQueryClient } from "@tanstack/react-query"
import { leaveCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";
import { POSTS_QUERY_KEYS } from "../../posts/lib/queryKeys";

const useLeaveCommunityMutation = () => {

  const queryClient = useQueryClient();

  const leaveCommunityMutation = useMutation({
    mutationFn: (communityId: string) => leaveCommunity(communityId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.communityId],
      })
    }
  });

  return leaveCommunityMutation;
}

export {
  useLeaveCommunityMutation
};