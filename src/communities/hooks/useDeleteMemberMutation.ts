import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMember } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useDeleteMemberMutation = () => {

  const queryClient = useQueryClient();

  const deleteMemberMutation = useMutation({
    mutationFn: ({ communityId, memberId } : {communityId: string | undefined, memberId: string }) => deleteMember({ communityId, memberId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.communityId],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_MEMBERS_BY_COMMUNITY, data.response?.communityId],
      })
    }
  });

  return deleteMemberMutation;
}

export {
  useDeleteMemberMutation
};