import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../posts/lib/queryKeys";
import { getCurrentUser } from "../lib/actions";

const useGetCurrentUser = (userId: string) => {
  const getCurrentUserQuery = useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => getCurrentUser(userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!userId
  })

  return {
    getCurrentUserQuery
  }
}

export default useGetCurrentUser;