import { useMutation, useQueryClient } from "@tanstack/react-query"
import { acceptMember } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useAcceptMemberMutation = () => {

  const queryClient = useQueryClient();

  const acceptMemberMutation = useMutation({
    mutationFn: ({ communityId, userId} : {communityId: string, userId: string }) => acceptMember({ communityId, userId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.communityId],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_MEMBERS_BY_COMMUNITY, data.response?.communityId],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_REQUESTS_BY_COMMUNITY, data.response?.communityId],
      })
    }
  });

  return acceptMemberMutation;
}

export {
  useAcceptMemberMutation
};