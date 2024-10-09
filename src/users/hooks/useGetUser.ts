import { getUser } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from '../lib/queryKeys';


const useGetUser = (userId: string) => {
  const getUserQuery = useQuery({
    queryKey: [USERS_QUERY_KEYS.GET_USER, userId],
    queryFn: () => getUser(userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!userId
  });

  return {
    getUserQuery
  }
}

export {
  useGetUser
};