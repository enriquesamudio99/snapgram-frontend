import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { getPostsByUser } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";

const useGetPostsByUser = (userId: string | null) => {
  const getPostsByUserQuery = useQuery({
    queryKey: [POSTS_QUERY_KEYS.GET_POSTS_BY_USER, userId],
    queryFn: () => getPostsByUser(userId),
    staleTime: 1000 * 60 * 60,
    enabled: !!userId
  });

  return {
    getPostsByUserQuery
  }
}

export {
  useGetPostsByUser
};