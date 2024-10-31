import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommunities } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useGetCommunities = () => {
  const getCommunitiesQuery = useInfiniteQuery({
    queryKey: [COMMUNITIES_QUERY_KEYS.GET_COMMUNITIES],
    queryFn: ({ pageParam }) => getCommunities(pageParam),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.response?.hasNextPage ? lastPage.response.nextPage : null;
    }
  })

  return {
    getCommunitiesQuery
  }
}

export {
  useGetCommunities
};