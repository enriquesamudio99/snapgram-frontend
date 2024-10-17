import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRequestCommunityMembership } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useDeleteRequestCommunityMutation = () => {

  const queryClient = useQueryClient();

  const deleteRequestCommunityMutation = useMutation({
    mutationFn: (communityId: string) => deleteRequestCommunityMembership(communityId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.communityId],
      })
    }
  });

  return deleteRequestCommunityMutation;
}

export {
  useDeleteRequestCommunityMutation
};