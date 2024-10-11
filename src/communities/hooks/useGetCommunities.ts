import { useQuery } from '@tanstack/react-query';
import { getCommunities } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useGetCommunities = () => {
  const getCommunitiesQuery = useQuery({
    queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITIES],
    queryFn: () => getCommunities(),
    staleTime: 1000 * 60 * 60
  })

  return {
    getCommunitiesQuery
  }
}

export {
  useGetCommunities
};