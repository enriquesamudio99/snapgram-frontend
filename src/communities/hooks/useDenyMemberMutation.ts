import { useMutation, useQueryClient } from "@tanstack/react-query"
import { denyMember } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useDenyMemberMutation = () => {

  const queryClient = useQueryClient();

  const denyMemberMutation = useMutation({
    mutationFn: ({ communityId, userId} : {communityId: string, userId: string }) => denyMember({ communityId, userId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_REQUESTS_BY_COMMUNITY, data.response?.communityId],
      })
    }
  });

  return denyMemberMutation;
}

export {
  useDenyMemberMutation
};