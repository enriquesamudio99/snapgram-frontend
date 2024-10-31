import { useInfiniteQuery } from '@tanstack/react-query';
import { searchCommunities } from '../lib/actions';
import { COMMUNITIES_QUERY_KEYS } from "../lib/queryKeys";

const useSearchCommunities = (searchTerm: string) => {
  const searchCommunitiesQuery = useInfiniteQuery({
    queryKey: [COMMUNITIES_QUERY_KEYS.GET_SEARCH_COMMUNITIES, searchTerm],
    queryFn: ({ pageParam }) => searchCommunities({ searchTerm, pageParam }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.response?.hasNextPage ? lastPage.response.nextPage : null;
    }
  })

  return {
    searchCommunitiesQuery
  }
}

export {
  useSearchCommunities
};