import { getUsers } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from '../lib/queryKeys';


const useGetUsers = () => {
  const getUsersQuery = useQuery({
    queryKey: [USERS_QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 60
  });

  return {
    getUsersQuery
  }
}

export {
  useGetUsers
};