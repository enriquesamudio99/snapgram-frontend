import { QUERY_KEYS } from "../lib/queryKeys";
import { searchPosts } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";

const useSearchPosts = (searchQuery: string) => {
  const searchPostsQuery = useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_BY_SEARCH, searchQuery],
    queryFn: () => searchPosts(searchQuery),
    staleTime: 1000 * 60 * 60,
    enabled: !!searchQuery
  })

  return {
    searchPostsQuery
  }
}

export {
  useSearchPosts
};