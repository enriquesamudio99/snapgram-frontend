import { useQuery } from '@tanstack/react-query';
import { getPostsByCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useGetPostsByCommunity = (communityId: string) => {
  const getPostsByCommunityQuery = useQuery({
    queryKey: [COMMUNITIES_QUERY_KEYS.GET_POSTS_BY_COMMUNITY, communityId],
    queryFn: () => getPostsByCommunity(communityId),
    staleTime: 1000 * 60 * 10
  })

  return {
    getPostsByCommunityQuery
  }
}

export {
  useGetPostsByCommunity
};