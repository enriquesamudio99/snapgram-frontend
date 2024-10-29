import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useUpdateCommunityMutation = () => {

  const queryClient = useQueryClient();

  const updateCommunityMutation = useMutation({
    mutationFn: ({ data, communityId } : { data: FormData, communityId: string }) => updateCommunity({ data, communityId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITIES],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, data.response?.community._id],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_MEMBERS_BY_COMMUNITY, data.response?.community._id],
      })
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_REQUESTS_BY_COMMUNITY, data.response?.community._id],
      })
    }
  });

  return updateCommunityMutation;
}

export {
  useUpdateCommunityMutation
};