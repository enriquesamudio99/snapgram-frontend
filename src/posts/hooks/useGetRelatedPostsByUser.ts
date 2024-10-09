import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { getPostsByUser } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";

const useGetRelatedPostsByUser = (userId: string, onlyOriginals?: boolean) => {
  const getRelatedPostsByUserQuery = useQuery({
    queryKey: [POSTS_QUERY_KEYS.GET_RELATED_POSTS_BY_USER, userId],
    queryFn: () => getPostsByUser(userId, onlyOriginals),
    staleTime: 1000 * 60 * 60
  });

  return {
    getRelatedPostsByUserQuery
  }
}

export {
  useGetRelatedPostsByUser
};