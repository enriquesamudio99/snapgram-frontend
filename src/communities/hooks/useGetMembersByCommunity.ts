import { useQuery } from '@tanstack/react-query';
import { getMembersByCommunity } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useGetMembersByCommunity = (communityId: string) => {
  const getMembersByCommunityQuery = useQuery({
    queryKey: [COMMUNITIES_QUERY_KEYS.GET_MEMBERS_BY_COMMUNITY, communityId],
    queryFn: () => getMembersByCommunity(communityId),
    staleTime: 1000 * 60 * 10
  })

  return {
    getMembersByCommunityQuery
  }
}

export {
  useGetMembersByCommunity
};