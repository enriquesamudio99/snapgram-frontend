import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useCommunityMutation = () => {

  const queryClient = useQueryClient();

  const communityMutation = useMutation({
    mutationFn: (data: FormData) => createCommunity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITIES],
      })
    }
  });

  return communityMutation;
}

export {
  useCommunityMutation
};