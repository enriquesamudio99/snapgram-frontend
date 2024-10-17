import { useQuery } from '@tanstack/react-query';
import { getCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useGetCommunity = (communityId: string | null) => {
  const getCommunityQuery = useQuery({
    queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITY, communityId],
    queryFn: () => getCommunity(communityId),
    staleTime: 1000 * 60 * 60
  })

  return {
    getCommunityQuery
  }
}

export {
  useGetCommunity
};