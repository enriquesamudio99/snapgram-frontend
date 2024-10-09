import { useQuery } from "@tanstack/react-query";
import { COMMON_QUERY_KEYS } from "../lib/queryKeys";
import { getCurrentUser } from "../lib/actions";

const useGetCurrentUser = () => {
  const getCurrentUserQuery = useQuery({
    queryKey: [COMMON_QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 60
  })

  return {
    getCurrentUserQuery
  }
}

export default useGetCurrentUser;