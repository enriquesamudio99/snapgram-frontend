import { getUsers } from '../lib/actions';
import { useInfiniteQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from '../lib/queryKeys';


const useGetUsers = () => {
  const getUsersQuery = useInfiniteQuery({
    queryKey: [USERS_QUERY_KEYS.GET_USERS],
    queryFn: ({ pageParam }) => getUsers(pageParam),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.response?.hasNextPage ? lastPage.response.nextPage : null;
    }
  });

  return {
    getUsersQuery
  }
}

export {
  useGetUsers
};