import { useQuery } from '@tanstack/react-query';
import { getRequestsByCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useGetRequestsByCommunity = (communityId: string) => {
  const getRequestsByCommunityQuery = useQuery({
    queryKey: [COMMUNITIES_QUERY_KEYS.GET_REQUESTS_BY_COMMUNITY, communityId],
    queryFn: () => getRequestsByCommunity(communityId),
    staleTime: 1000 * 60 * 10
  })

  return {
    getRequestsByCommunityQuery
  }
}

export {
  useGetRequestsByCommunity
};