import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { searchPosts } from '../lib/actions';
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearchPosts = (searchQuery: string) => {
  const searchPostsQuery = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEYS.GET_POSTS_BY_SEARCH, searchQuery],
    queryFn: ({ pageParam }) => searchPosts({ pageParam, searchQuery }),
    staleTime: 1000 * 60 * 60,
    enabled: !!searchQuery,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.response?.hasNextPage ? lastPage.response.nextPage : null;
    }
  })

  return {
    searchPostsQuery
  }
}

export {
  useSearchPosts
};