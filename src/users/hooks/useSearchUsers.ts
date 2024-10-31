import { searchUsers } from '../lib/actions';
import { USERS_QUERY_KEYS } from '../lib/queryKeys';
import { useInfiniteQuery } from "@tanstack/react-query";


const useSearchUsers = (searchTerm: string) => {
  const searchUsersQuery = useInfiniteQuery({
    queryKey: [USERS_QUERY_KEYS.GET_SEARCH_USERS, searchTerm],
    queryFn: ({ pageParam }) => searchUsers({ searchTerm, pageParam }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.response?.hasNextPage ? lastPage.response.nextPage : null;
    }
  });

  return {
    searchUsersQuery
  }
}

export {
  useSearchUsers
};