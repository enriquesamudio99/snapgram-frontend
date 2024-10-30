import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { getPosts } from '../lib/actions';
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetPosts = () => {
  const getPostsQuery = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEYS.GET_POSTS],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.response?.hasNextPage ? lastPage.response.nextPage : null;
    }
  })

  return {
    getPostsQuery
  }
}

export {
  useGetPosts
};