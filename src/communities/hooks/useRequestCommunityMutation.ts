import { useMutation, useQueryClient } from "@tanstack/react-query"
import { requestCommunityMembership } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useRequestCommunityMutation = () => {

  const queryClient = useQueryClient();

  const requestCommunityMutation = useMutation({
    mutationFn: (communityId: string) => requestCommunityMembership(communityId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.communityId],
      })
    }
  });

  return requestCommunityMutation;
}

export {
  useRequestCommunityMutation
};