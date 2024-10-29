import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useDeleteCommunityMutation = () => {

  const queryClient = useQueryClient();

  const deleteCommunityMutation = useMutation({
    mutationFn: (communityId: string) => deleteCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITIES],
      })
    }
  });

  return deleteCommunityMutation;
}

export {
  useDeleteCommunityMutation
};